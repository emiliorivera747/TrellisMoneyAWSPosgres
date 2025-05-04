export function getValueOrDefault<T>(value: T | null | undefined, defaultValue: T): T {
    return value !== null && value !== undefined ? value : defaultValue;
  }