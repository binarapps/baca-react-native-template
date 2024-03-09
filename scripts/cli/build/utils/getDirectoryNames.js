'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getDirectoryNames = void 0
const fs_1 = __importDefault(require('fs'))
/**
 * Retrieves the names of all sub-directories in the specified directory.
 *
 * @param directoryPath - The path of the directory to retrieve directory names from.
 * @returns An array of directory names.
 */
const getDirectoryNames = (directoryPath) => {
  try {
    // Read the contents of the directory
    const contents = fs_1.default.readdirSync(directoryPath)
    // Filter out only directories
    const folderNames = contents.filter((item) => {
      const stat = fs_1.default.statSync(`${directoryPath}/${item}`)
      return stat.isDirectory()
    })
    return folderNames
  } catch (err) {
    console.error(`Error reading directory: ${err}`)
    return []
  }
}
exports.getDirectoryNames = getDirectoryNames
