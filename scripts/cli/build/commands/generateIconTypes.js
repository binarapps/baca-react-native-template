'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateIconTypes = void 0
const fs_1 = __importDefault(require('fs'))
const prefix = `export type IconNames =
  | `
const generateIconTypes = () => {
  const json = fs_1.default.readFileSync('./assets/icomoon/selection.json')
  const types = JSON.parse(json.toString())
    .icons.map((icon) => `'${icon.properties.name}'`)
    .join('\n  | ')
    .concat('\n')
  const content = prefix + types
  fs_1.default.writeFileSync('./src/types/icon.d.ts', content)
}
exports.generateIconTypes = generateIconTypes
