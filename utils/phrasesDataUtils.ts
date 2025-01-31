/**
 * massages the conversation data and returns an array of phrases with speaker names.
 *
 * @param {DefaultConversation} conversation - The default conversation object containing speakers and their phrases.
 * @returns {Phrase[]} An array of phrases with additional speakerName property.
 */
export function massagePhrasesData(conversation: DefaultConversation) {
  const { speakers } = conversation;
  const result: Phrase[] = [];

  // determine the maximum number of phrases any speaker has
  // this will be used to loop through all possible indexes
  const maxLength = Math.max(
    ...speakers.map((speaker) => speaker.phrases.length)
  );

  // loop through each index up to the maximum length, to make sure we have all phrases
  for (let i = 0; i < maxLength; i++) {
    for (const speaker of speakers) {
      // check if the current speaker has a phrase at this index
      if (i < speaker.phrases.length) {
        result.push({
          speakerName: speaker.name,
          words: speaker.phrases[i].words,
          time: speaker.phrases[i].time,
        });
      }
    }
  }

  return result;
}
