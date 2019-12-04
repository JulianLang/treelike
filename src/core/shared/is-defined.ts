/**
 * Determines whether a given value is null or undefined.
 * @param value The value to test for null and undefined.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
