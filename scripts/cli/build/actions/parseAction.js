'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseAction = void 0
const constants_1 = require('../constants')
const parseAction = (action) => {
  if (!constants_1.CLI_ACTIONS.includes(action)) {
    console.error('\x1b[31m%s\x1b[0m', `Invalid action ${action}`)
    return
  }
}
exports.parseAction = parseAction
