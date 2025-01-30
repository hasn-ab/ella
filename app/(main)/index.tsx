import AudioPlayer from "@/components/PhraseAudioPlayer/AudioPlayer";
import { Colors } from "@/styles/hooks/Colors";
import { useThemedStyles } from "@/styles/hooks/useThemeStyles";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { styles } = useThemedStyles(makeStyles);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}></View>
        <AudioPlayer />
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
