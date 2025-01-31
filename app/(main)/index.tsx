/**
 * HomeScreen component renders the main screen of the application.
 * It includes a PhraseList and an AudioPlayer component wrapped inside a SafeAreaView.
 * The component uses themed styles for styling.
 *
 * @returns {JSX.Element} The rendered HomeScreen component.
 */
import AudioPlayer from "@/components/PhraseAudioPlayer/AudioPlayer";
import PhraseList from "@/components/PhraseAudioPlayer/PhraseList";
import { Colors } from "@/styles/hooks/Colors";
import { useThemedStyles } from "@/styles/hooks/useThemeStyles";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAudioPlayer } from "@/components/PhraseAudioPlayer/hooks/useAudioPlayer";

export default function HomeScreen() {
  const { styles } = useThemedStyles(makeStyles);

  const {
    currentIndex,
    audioDuration,
    currentDurationInMillis,
    isPlaying,
    pause,
    resume,
    seekToNextPhrase,
    seekToPreviousPhrase,
  } = useAudioPlayer();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <PhraseList currentActiveIndex={currentIndex} />
        <AudioPlayer
          fileDurationInMillis={audioDuration}
          currentDurationInMillis={currentDurationInMillis}
          isPlaying={isPlaying}
          onPlayPress={isPlaying ? pause : resume}
          onForwardPress={seekToNextPhrase}
          onBackwardPress={seekToPreviousPhrase}
        />
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
  });
