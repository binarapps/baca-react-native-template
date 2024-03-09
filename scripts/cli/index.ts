import { Command } from 'commander'

import { parseAction } from './actions'

const program = new Command()

program
  .argument('<action>')
  .option('-d, --debug', 'Set the debug level')
  .action((action, options, command) => {
    parseAction(action)
  })

program.parse()
