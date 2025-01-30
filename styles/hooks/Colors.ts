// add color types here
export type Colors = {
  backgroundPrimary: string;
  contentPrimary: string;
};

export type ColorMode = {
  light: Colors;
  dark: Colors;
};

// add color values here, each value should have a light and dark mode equivalent
export const ThemeColors: ColorMode = {
  light: {
    backgroundPrimary: "#F9F9F9",
    contentPrimary: "#11181C",
  },
  dark: {
    backgroundPrimary: "#11181C",
    contentPrimary: "#F9F9F9",
  },
};
