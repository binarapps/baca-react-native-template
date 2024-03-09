'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const commander_1 = require('commander')
const actions_1 = require('./actions')
const program = new commander_1.Command()
program
  .argument('<action>')
  .option('-d, --debug', 'Set the debug level')
  .action((action, options, command) => {
    ;(0, actions_1.parseAction)(action)
  })
program.parse()
