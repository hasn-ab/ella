import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useThemedStyles } from "@/styles/hooks/useThemeStyles";
import { Colors } from "@/styles/hooks/Colors";
import { Spacing } from "@/styles/Spacing";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Slider } from "react-native-elements";
import { formatDuration } from "@/utils/timeFormatUtils";

interface AudioPlayerProps {
  // time in milliseconds
  currentDurationInMillis: number;
  fileDurationInMillis: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  fileDurationInMillis,
  currentDurationInMillis,
}) => {
  const { styles, colors } = useThemedStyles(makeStyles);

  const sliderValue = Math.ceil(currentDurationInMillis / 1000);
  const maxSliderValue = Math.ceil(fileDurationInMillis / 1000);

  return (
    <View style={styles.container}>
      <Slider
        allowTouchTrack={false}
        style={styles.slider}
        maximumTrackTintColor={colors.backgroundBlueTint}
        minimumTrackTintColor={colors.contentAccent}
        thumbStyle={styles.sliderThumb}
        trackStyle={styles.trackStyle}
        maximumValue={maxSliderValue}
        minimumValue={0}
        value={sliderValue}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formatDuration(currentDurationInMillis)}
        </Text>
        <Text style={styles.timeText}>
          {formatDuration(fileDurationInMillis)}
        </Text>
      </View>

      <View style={styles.playerContainer}>
        <Ionicons name="play-back-sharp" size={24} color="black" />
        <Ionicons name="play-sharp" size={40} color="black" />
        <Ionicons name="play-forward-sharp" size={24} color="black" />
      </View>
    </View>
  );
};

export default React.memo(AudioPlayer);

const makeStyles = (color: Colors) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 100,
      justifyContent: "flex-end",
      backgroundColor: color.backgroundSecondary,
    },
    slider: {
      width: "100%",
      height: 10,
    },
    trackStyle: {
      height: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    timeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: Spacing.S_0,
      paddingHorizontal: Spacing.S_2,
    },
    timeText: {
      color: color.contentSecondary,
      fontSize: 12,
    },
    playerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      columnGap: Spacing.S_4,
      paddingVertical: Spacing.S_2,
    },
    sliderThumb: {
      // this is to hide the thumb
      height: 0,
      width: 0,
    },
  });
