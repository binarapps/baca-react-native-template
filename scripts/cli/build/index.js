'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const commander_1 = require('commander')
const actions_1 = require('./actions')
const program = new commander_1.Command()
program.argument('<action>').action((action) => {
  ;(0, actions_1.executeAction)(action)
})
program.parse()
