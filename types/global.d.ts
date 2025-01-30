interface DefaultPhrase {
  words: string;
  time: number;
}

interface DefaultSpeaker {
  name: string;
  phrases: DefaultPhrase[];
}

interface DefaultConversation {
  pause: number;
  speakers: DefaultSpeaker[];
}

interface Phrase extends DefaultPhrase {
  speakerName: string;
}

interface Speaker extends DefaultSpeaker {
  phrases: Phrase[];
}

interface Conversation extends DefaultConversation {
  speakers: Speaker[];
}
