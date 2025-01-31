/**
 * Converts milliseconds to mm:ss format.
 *
 * @param milliseconds - The duration in milliseconds.
 * @returns A string in the format "mm:ss".
 */
export function formatDuration(milliseconds: number): string {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}
