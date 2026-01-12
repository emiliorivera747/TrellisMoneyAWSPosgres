// utils/toSnakeCase.ts
const toSnake = (str: string) =>
  str.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`);

/**
 * Recursively converts the keys of an object or array to snake_case.
 *
 * @typeParam T - The type of the input object or array.
 * @param obj - The object or array to transform.
 * @returns A new object or array with all keys converted to snake_case.
 */
export function deepSnakeCase<T>(obj: T): any {
  if (Array.isArray(obj)) {
    return obj.map(deepSnakeCase);
  }

  if (obj && typeof obj === "object" && obj.constructor === Object) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [toSnake(k), deepSnakeCase(v)])
    );
  }

  return obj;
}
