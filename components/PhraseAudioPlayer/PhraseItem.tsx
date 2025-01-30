import { Colors } from "@/styles/hooks/Colors";
import { useThemedStyles } from "@/styles/hooks/useThemeStyles";
import { Spacing } from "@/styles/Spacing";
import { StyleSheet, ViewStyle, View, Text } from "react-native";
import { useStyle } from "react-native-style-utilities";

type PhraseItemProps = {
  phrase: Phrase;
  style?: ViewStyle;
  alignItem: "left" | "right";
  isActive: boolean;
};

export const PhraseItem: React.FC<PhraseItemProps> = ({
  phrase,
  style,
  alignItem,
  isActive,
}) => {
  const { styles, colors } = useThemedStyles(makePhraseItemsStyles);

  // using useStyle to avoid re-creation of array styles when component re-renders
  const containerStyle = useStyle(
    () => [
      styles.container,
      {
        alignSelf: alignItem === "left" ? "flex-start" : "flex-end",
      },
      style,
    ],
    [style]
  );

  const speakerNameStyle = useStyle(
    () => [
      styles.speakerName,
      {
        textAlign: alignItem,
        // highlight the speaker name when the phrase is active
        color: isActive ? colors.contentAccent : colors.contentPrimary,
      },
    ],
    []
  );
  const phraseStyle = useStyle(
    () => [
      styles.phrase,
      {
        // highlight the phrase text & background when the phrase is active
        color: isActive ? colors.contentAccent : colors.contentPrimary,
        backgroundColor: isActive
          ? colors.backgroundBlueTint
          : colors.backgroundSecondary,
      },
    ],
    []
  );

  return (
    <View style={containerStyle}>
      {/* todo: replace react native Text component with design system components  */}
      <Text style={speakerNameStyle}>{phrase.speakerName}</Text>
      <Text style={phraseStyle}>{phrase.words}</Text>
    </View>
  );
};

const makePhraseItemsStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      maxWidth: "80%",
    },
    speakerName: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.contentPrimary,
      marginHorizontal: Spacing.S_1,
      marginBottom: Spacing.S_1,
    },
    phrase: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.contentPrimary,
      borderBottomColor: colors.borderPrimary,
      paddingHorizontal: Spacing.S_1,
      paddingVertical: Spacing.S_1,
      borderRadius: 10,
    },
  });
