import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { massagePhrasesData } from "@/utils/phrasesDataUtils";
import phrasesData from "@/constants/example_audio.json";

export function useAudioPlayer() {
  const phrases = useMemo(() => massagePhrasesData(phrasesData), []);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [currentStatus, setCurrentStatus] =
    useState<AVPlaybackStatusSuccess | null>(null);
  const timeoutRef = useRef(null);
  const startTimes = useMemo(() => {
    // find prefix start times
    return phrases.reduce(
      (acc, item, index) => {
        acc.push(acc[index] + item.time + 250);
        return acc;
      },
      [0]
    );
  }, [phrases]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Binary search to find current index
  const findCurrentIndex = useCallback(
    (position: number) => {
      let low = 0;
      let high = startTimes.length - 1;
      let bestIdx = 0;
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (startTimes[mid] <= position) {
          bestIdx = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return Math.min(bestIdx, phrases.length - 1);
    },
    [phrases.length]
  );

  // Update the current index based on audio position
  const updateCurrentIndex = useCallback(async () => {
    const status = await soundRef.current?.getStatusAsync();

    if (status?.isLoaded) {
      const newIndex = findCurrentIndex(status.positionMillis);
      setCurrentIndex(newIndex);
      setCurrentStatus(status as AVPlaybackStatusSuccess);
    } else {
      setCurrentStatus(null);
    }
  }, [findCurrentIndex]);

  // Play the audio
  const playAudio = useCallback(async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      require("@/assets/sampleAudio.mp3"),
      { shouldPlay: true, progressUpdateIntervalMillis: 100, isLooping: true },
      updateCurrentIndex
    );
    soundRef.current = sound;
    if (status?.isLoaded) {
      const fileDuration =
        (status as AVPlaybackStatusSuccess).durationMillis || 0;
      setCurrentStatus(status);
      await sound.playAsync();
    } else {
      setCurrentStatus(null);
    }
  }, [updateCurrentIndex]);

  // cleanup resources when the component unmounts
  useEffect(() => {
    playAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [playAudio]);

  return {
    currentIndex,
    audioDuration: currentStatus?.durationMillis || 0,
    currentDurationInMillis: currentStatus?.positionMillis || 0,
    isPlaying: currentStatus?.isPlaying || false,
    pause: async () => {
      await soundRef.current?.pauseAsync();
    },
    resume: async () => {
      await soundRef.current?.playAsync();
    },
    seek: async (position: number) => {
      await soundRef.current?.setPositionAsync(position);
    },
  };
}
