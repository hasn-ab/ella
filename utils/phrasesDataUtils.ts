/**
 * massages the conversation data and returns an array of phrases with speaker names.
 *
 * @param {DefaultConversation} conversation - The default conversation object containing speakers and their phrases.
 * @returns {Phrase[]} An array of phrases with additional speakerName property.
 */
export function massagePhrasesData(conversation: DefaultConversation) {
  const phrases: Phrase[] = [];

  conversation.speakers.forEach((speaker: DefaultSpeaker) => {
    speaker.phrases.forEach((defaultPhrase: DefaultPhrase) => {
      const phrase: Phrase = {
        ...defaultPhrase,
        speakerName: speaker.name,
      };

      phrases.push(phrase);
    });
  });

  return phrases;
}
