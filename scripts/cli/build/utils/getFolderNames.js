'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.getFolderNames = void 0
const fs_1 = __importDefault(require('fs'))
/**
 * Retrieves the names of all folders in the specified directory.
 *
 * @param directoryPath - The path of the directory to retrieve folder names from.
 * @returns An array of folder names.
 */
const getFolderNames = (directoryPath) => {
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
exports.getFolderNames = getFolderNames
