/**
 * Adds the specified text after the first occurrence of the search text in the content.
 *
 * @param content - The original content string.
 * @param searchText - The text to search for in the content.
 * @param textToAdd - The text to add after the first occurrence of the search text.
 * @returns The modified content string with the text added.
 */
export const addAfter = (content: string, searchText: string, textToAdd: string) => {
  return content.replace(searchText, searchText + textToAdd)
}

/**
 * Adds the specified text before the first occurrence of the search text in the content.
 *
 * @param content - The original content string.
 * @param searchText - The text to search for in the content.
 * @param textToAdd - The text to add before the first occurrence of the search text.
 * @returns The modified content string with the text added before the first occurrence of the search text.
 */
export const addBefore = (content: string, searchText: string, textToAdd: string) => {
  return content.replace(searchText, textToAdd + searchText)
}

/**
 * Deletes all occurrences of a specified search text from the given content.
 *
 * @param content - The content from which to delete the search text.
 * @param searchText - The text to be deleted from the content.
 * @returns The updated content with all occurrences of the search text removed.
 */
export const deleteText = (content: string, searchText: string) => {
  return content.replace(searchText, '')
}
