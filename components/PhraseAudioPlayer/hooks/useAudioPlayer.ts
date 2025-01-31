import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Audio, AVPlaybackStatusSuccess } from "expo-av";
import { massagePhrasesData } from "@/utils/phrasesDataUtils";
import phrasesData from "@/constants/example_audio.json";

/**
 *  Custom hook to manage the audio player state.
 *  @returns {Object} An object containing the current index,
 *  audio duration, current duration, isPlaying status, pause,
 *  resume, seekToNextPhrase, and seekToPreviousPhrase functions.
 */

export function useAudioPlayer() {
  const [currentStatus, setCurrentStatus] =
    useState<AVPlaybackStatusSuccess | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const phrases = useMemo(() => massagePhrasesData(phrasesData), []);
  const startTimes = useMemo(() => {
    // find prefix start times
    return phrases.reduce(
      (acc, item, index) => {
        // 250ms is added to the time to account for the pause between phrases
        acc.push(acc[index] + item.time + phrasesData.pause);
        return acc;
      },
      [0]
    );
  }, [phrases]);

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
      setCurrentStatus(status);
      await sound.playAsync();
    } else {
      setCurrentStatus(null);
    }
  }, [updateCurrentIndex]);

  // this function seeks to the next phrase in the audio using next prefix start time
  const seekToNextPhrase = useCallback(() => {
    const nextPhraseIndex =
      currentIndex + 1 > phrases.length - 1 ? 0 : currentIndex + 1;
    const nextPhrase = phrases[nextPhraseIndex];
    if (nextPhrase) {
      soundRef.current?.setPositionAsync(startTimes[nextPhraseIndex]);
    }
  }, [currentIndex]);

  // this function seeks to the previous phrase in the audio using previous prefix start time
  const seekToPreviousPhrase = useCallback(() => {
    const previousPhraseIndex =
      currentIndex - 1 < 0 ? phrases.length - 1 : currentIndex - 1;
    const previousPhrase = phrases[previousPhraseIndex];
    if (previousPhrase) {
      soundRef.current?.setPositionAsync(startTimes[previousPhraseIndex]);
    }
  }, [currentIndex]);

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
    seekToNextPhrase,
    seekToPreviousPhrase,
  };
}
