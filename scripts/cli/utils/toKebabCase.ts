/**
 * Converts a given string to kebab-case.
 * 
 * This function transforms a camelCase or PascalCase string into a kebab-case string.
 * It also replaces underscores with hyphens and converts all characters to lowercase.
 * 
 * @param input - The string to be converted to kebab-case.
 * @returns The kebab-case version of the input string.
 * 
 * @example
 * ```typescript
 * toKebabCase('camelCaseString'); // 'camel-case-string'
 * toKebabCase('PascalCaseString'); // 'pascal-case-string'
 * toKebabCase('snake_case_string'); // 'snake-case-string'
 * ```
 */
export function toKebabCase(input?: string): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase();
}