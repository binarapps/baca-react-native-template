import { Command } from 'commander'

import { executeAction } from './actions'

const program = new Command()

program.argument('<action>').action((action) => {
  executeAction(action)
})

program.parse()
