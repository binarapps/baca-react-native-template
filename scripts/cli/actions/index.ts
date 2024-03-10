import { bootstrap } from './bootstrap'
import { generate } from './generate'
import { CLI_ACTIONS } from '../constants'
import { logger } from '../utils'

const actions = {
  generate,
  g: generate,
  bootstrap,
  b: bootstrap,
}

/**
 * Parses and executes the specified CLI action.
 *
 * @param action - The CLI action to parse and execute.
 */
export const executeAction = (action: keyof typeof actions) => {
  if (!CLI_ACTIONS.includes(action)) {
    logger.error(`Action ${action} is not supported.`)
    return
  }
  actions[action]()
}
