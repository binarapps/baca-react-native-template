'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.executeAction = void 0
const bootstrap_1 = require('./bootstrap')
const generate_1 = require('./generate')
const constants_1 = require('../constants')
const utils_1 = require('../utils')
const actions = {
  generate: generate_1.generate,
  g: generate_1.generate,
  bootstrap: bootstrap_1.bootstrap,
  b: bootstrap_1.bootstrap,
}
/**
 * Parses and executes the specified CLI action.
 *
 * @param action - The CLI action to parse and execute.
 */
const executeAction = (action) => {
  if (!constants_1.CLI_ACTIONS.includes(action)) {
    utils_1.logger.error(`Action ${action} is not supported.`)
    return
  }
  actions[action]()
}
exports.executeAction = executeAction
