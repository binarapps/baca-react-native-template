// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import selectPrompt from 'select-prompt'

import { generateComponent } from '../commands/generateComponent'
import { generateIconTypes } from '../commands/generateIconTypes'
import { generateScreen } from '../commands/generateScreen'
import { generateTheme } from '../commands/generateTheme'

const data = [
  {
    title: 'Screen',
    value: 'screen',
    command: generateScreen,
  },
  {
    title: 'Component',
    value: 'component',
    command: generateComponent,
  },
  {
    title: 'Icon types',
    value: 'icon-types',
    command: generateIconTypes,
  },
  {
    title: 'Generate theme',
    value: 'generate-theme',
    command: generateTheme,
  },
] as const

const generatePrompts = data.map(({ title, value }) => ({ title, value }))

export const generate = () => {
  selectPrompt('What do you want to generate?', generatePrompts).on(
    'submit',
    async (value: string) => {
      const command = data.find((item) => item.value === value)?.command

      if (command) {
        command()
      } else {
        console.log('There was some issue while running the script ', value)
      }
    }
  )
}
