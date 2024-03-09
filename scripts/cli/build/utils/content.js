'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteText = exports.addBefore = exports.addAfter = void 0
/**
 * Adds the specified text after the first occurrence of the search text in the content.
 *
 * @param content - The original content string.
 * @param searchText - The text to search for in the content.
 * @param textToAdd - The text to add after the first occurrence of the search text.
 * @returns The modified content string with the text added.
 */
const addAfter = (content, searchText, textToAdd) => {
  return content.replace(searchText, searchText + textToAdd)
}
exports.addAfter = addAfter
/**
 * Adds the specified text before the first occurrence of the search text in the content.
 *
 * @param content - The original content string.
 * @param searchText - The text to search for in the content.
 * @param textToAdd - The text to add before the first occurrence of the search text.
 * @returns The modified content string with the text added before the first occurrence of the search text.
 */
const addBefore = (content, searchText, textToAdd) => {
  return content.replace(searchText, textToAdd + searchText)
}
exports.addBefore = addBefore
/**
 * Deletes all occurrences of a specified search text from the given content.
 *
 * @param content - The content from which to delete the search text.
 * @param searchText - The text to be deleted from the content.
 * @returns The updated content with all occurrences of the search text removed.
 */
const deleteText = (content, searchText) => {
  return content.replace(searchText, '')
}
exports.deleteText = deleteText
