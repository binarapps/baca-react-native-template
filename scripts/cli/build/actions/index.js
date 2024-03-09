'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.parseAction = void 0
const bootstrap_1 = require('./bootstrap')
const generate_1 = require('./generate')
const constants_1 = require('../constants')
const actions = {
  generate: generate_1.generate,
  g: generate_1.generate,
  bootstrap: bootstrap_1.bootstrap,
  b: bootstrap_1.bootstrap,
}
const parseAction = (action) => {
  if (!constants_1.CLI_ACTIONS.includes(action)) {
    console.error('\x1b[31m%s\x1b[0m', `Invalid action ${action}`)
    return
  }
  actions[action]()
}
exports.parseAction = parseAction
