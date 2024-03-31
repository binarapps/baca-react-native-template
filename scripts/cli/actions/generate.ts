// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import selectPrompt from 'select-prompt'

import { generateIconTypes } from '../commands/generateIconTypes'
import { generateScreen } from '../commands/generateScreen'
import { generateTheme } from '../commands/generateTheme'
import { logger } from '../utils'

const generatePrompts = [
  {
    title: 'Screen',
    value: 'screen',
  },
  {
    title: 'Component TBD',
    value: 'component',
  },
  {
    title: 'Icon types',
    value: 'icon-types',
  },
  {
    title: 'Generate theme',
    value: 'generate-theme',
  },
]

const commands = {
  screen: generateScreen,
  component: () => {
    logger.info('Not implemented yet.')
    logger.info('Please use the `yarn generate:component` command.')
  },
  'icon-types': generateIconTypes,
  'generate-theme': generateTheme,
}

export const generate = () => {
  selectPrompt('What do you want to generate?', generatePrompts).on(
    'submit',
    async (value: keyof typeof commands) => {
      commands[value]()
    }
  )
}
