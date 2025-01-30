// add color types here
export type Colors = {
  backgroundPrimary: string;
  backgroundSecondary: string;
  contentPrimary: string;
  contentSecondary: string;
  contentAccent: string;
  backgroundBlueTint: string;
  borderPrimary: string;
};

export type ColorMode = {
  light: Colors;
  dark: Colors;
};

// add color values here, each value should have a light and dark mode equivalent
export const ThemeColors: ColorMode = {
  light: {
    backgroundPrimary: "#F9F9F9",
    backgroundSecondary: "#FFFFFF",
    contentPrimary: "#000000",
    contentSecondary: "#00000052",
    contentAccent: "#DBA604",
    backgroundBlueTint: "#8794FF33",
    borderPrimary: "#E2E2E2",
  },
  dark: {
    backgroundPrimary: "#000000",
    backgroundSecondary: "#1F1F1F",
    contentPrimary: "#F9F9F9",
    contentSecondary: "#FFFFFF52",
    contentAccent: "#DBA604",
    backgroundBlueTint: "#8794FF33",
    borderPrimary: "#2D2D2D",
  },
};
