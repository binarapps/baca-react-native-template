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
    // TODO: Parse all actions
    // Start with generate
    // console.log({ action, options, command })
    // if (!['g', 'generate'].includes(action)) {
    //   console.log({ action })
    //   throw new Error('Invalid action')
    // }
    // if (options.debug) {
    //   console.error('Called %s with options %o', command.name(), options)
    // }
    // selectPrompt('What do you want to generate?', [
    //   {
    //     title: 'Screen',
    //     value: 'screen',
    //   },
    //   {
    //     title: 'Component',
    //     value: 'component',
    //   },
    // ]).on('submit', async (value: string) => {
    //   console.log(`You want me to generate a ${value}!`)
    // })
  })
program.parse()
