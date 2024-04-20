// #!/usr/bin/env node
import { Command } from 'commander'

import { actions } from './actions'
import { generators } from './actions/generate'

class CommandWithTrace extends Command {
  createCommand(name: string) {
    const cmd = new CommandWithTrace(name)
    // Add an option to subcommands created using `.command()`
    cmd.option('-t, --trace', 'display extra information when run command')
    return cmd
  }
}

function inpectCommand(command: Command) {
  // The option value is stored as property on command because we called .storeOptionsAsProperties()

  console.log(command.helpInformation())
  //   console.log(`
  // Please run this script with -h argument, to see what options you have
  //   `)
}

const program = new CommandWithTrace('baca').action((options, command) => {
  inpectCommand(command)
})

const generateGroup = program
  .command('generate [params...]')
  .description('Run generators, please check `g -h` to check available generators')
  .alias('g')
  .action(() => {
    actions.generate()
  })

generators.forEach((generator) => {
  generateGroup
    .command(generator.value)
    .description(generator.description)
    .action(() => generator.command())
})

program
  .command('bootstrap')
  .option('-s, --simple', 'Run bootstrap simple with needed values')
  .description('Bootstrap of new project')
  .alias('b')
  .action((buildTarget) => {
    const isSimple = buildTarget.simple ?? false
    actions.bootstrap({ isSimple })
  })

program.parse()
