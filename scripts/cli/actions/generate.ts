import { prompt } from 'enquirer'

import { generateIconTypes, generateScreen, generateTheme, generateComponent } from '../commands'

export const generators = [
  {
    title: 'Screen',
    description: 'Generate new screen',
    value: 'screen',
    command: generateScreen,
  },
  {
    title: 'Component',
    description: 'Generate new component',
    value: 'component',
    command: generateComponent,
  },
  {
    title: 'Icon types',
    description: 'Generate new icon types - based on icon - `selection.json`',
    value: 'icon-types',
    command: generateIconTypes,
  },
  {
    title: 'Generate theme',
    description: 'Generate new theme - based on figma variables',
    value: 'generate-theme',
    command: generateTheme,
  },
] as const

export const generate = async () => {
  const promptAnswer = await prompt({
    name: 'generator',
    message: 'What do you want to generate?',
    type: 'select',
    choices: generators.map((generator) => ({
      name: generator.title,
      value: generator.value,
    })),
  })

  // @ts-expect-error: generator not found on promptAnswer
  const answerValue = promptAnswer?.generator as string

  const command = generators.find((item) => item.title === answerValue)?.command

  if (command) {
    command()
  } else {
    console.log('There was some issue while running the script ', answerValue)
  }
}
