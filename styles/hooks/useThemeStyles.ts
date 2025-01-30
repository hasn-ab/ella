import { Colors, ThemeColors } from "@/styles/hooks/Colors";
import { useMemo } from "react";
import { ViewStyle, TextStyle, ImageStyle, useColorScheme } from "react-native";

// base style types
export type RNStyle = ViewStyle | TextStyle | ImageStyle;
export type NamedStyles<T> = { [P in keyof T]: RNStyle };

// style callback types
export type StyleCallback<T extends NamedStyles<T>> = (colors: Colors) => T;

// hook type
export type UseThemedStyles = <T extends NamedStyles<T>>(
  styleCallback: StyleCallback<T>
) => T;

/**
 * a custom hook that creates memoized styles based on theme colors
 * @param styleCallback - a callback function that receives theme colors and returns styles
 * @returns memoized StyleSheet styles
 */
export const useThemedStyles: UseThemedStyles = (styleCallback) => {
  const theme = useColorScheme();

  const themeColors: Colors = useMemo(() => {
    return ThemeColors[theme ?? "dark"];
  }, []);

  // memoize the styles to prevent unnecessary recalculations
  const styles = useMemo(() => {
    return styleCallback(themeColors);
  }, [themeColors]);

  return styles;
};
