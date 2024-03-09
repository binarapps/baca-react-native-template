import fs from 'fs'

/**
 * Retrieves the names of all sub-directories in the specified directory.
 *
 * @param directoryPath - The path of the directory to retrieve directory names from.
 * @returns An array of directory names.
 */
export const getDirectoryNames = (directoryPath: string): string[] => {
  try {
    // Read the contents of the directory
    const contents = fs.readdirSync(directoryPath)

    // Filter out only directories
    const folderNames = contents.filter((item) => {
      const stat = fs.statSync(`${directoryPath}/${item}`)
      return stat.isDirectory()
    })

    return folderNames
  } catch (err) {
    console.error(`Error reading directory: ${err}`)
    return []
  }
}
