import { bootstrap } from './bootstrap'
import { generate } from './generate'
import { CLI_ACTIONS } from '../constants'
import { CliActions } from '../types'

const actions = {
  generate,
  g: generate,
  bootstrap,
  b: bootstrap,
}

export const parseAction = (action: CliActions) => {
  if (!CLI_ACTIONS.includes(action)) {
    console.error('\x1b[31m%s\x1b[0m', `Invalid action ${action}`)
    return
  }
  actions[action]()
}
