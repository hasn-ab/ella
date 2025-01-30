import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { Colors } from "@/styles/hooks/Colors";
import phrasesData from "@/constants/example_audio.json";
import { useThemedStyles } from "@/styles/hooks/useThemeStyles";
import { massagePhrasesData } from "@/utils/phrasesDataUtils";
import { Spacing } from "@/styles/Spacing";
import { PhraseItem } from "./PhraseItem";

const PhraseList = () => {
  const { styles } = useThemedStyles(makeStyles);

  // convert the phrasesData to Phrase type and store it in phrases to ensure that the data is only converted once
  const phrases = useMemo(() => massagePhrasesData(phrasesData), []);

  const renderItem: ListRenderItem<Phrase> = useCallback(({ item, index }) => {
    return (
      <PhraseItem
        phrase={item}
        // alternate the alignment of the message based on the index
        // todo: update it once we have requirements for the alignment
        alignItem={index % 2 === 0 ? "left" : "right"}
        // todo change this once we have the list item highlight logic in place
        isActive={index % 2 !== 0}
      />
    );
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={phrases}
        renderItem={renderItem}
        // since we don't have a unique id for each item, following is a workaround to avoid the warning
        keyExtractor={(item, index) => item.speakerName + index}
        ItemSeparatorComponent={() => <View style={styles.listRowGap} />}
      />
    </View>
  );
};

export default PhraseList;

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: Spacing.S_2,
    },
    listRowGap: {
      height: Spacing.S_1,
    },
  });
