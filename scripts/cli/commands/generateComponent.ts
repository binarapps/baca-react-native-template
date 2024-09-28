import { prompt } from 'enquirer'

import { COMPONENT_TEMPLATE_PATH, COMPONENTS_PATH } from '../constants'
import { logger } from '../utils'

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const paths = {
  template: COMPONENT_TEMPLATE_PATH,
  componentsIndex: COMPONENTS_PATH,
}

const createComponentFile = (name: string) => {
  const componentFromFile = fs.readFileSync(paths.template, 'utf8')
  const componentContent = componentFromFile.replaceAll('_NAME_', name)

  const newComponentPath = `./src/components/${name}/${name}.tsx`
  fs.mkdirSync(`./src/components/${name}`, { recursive: true })
  fs.writeFileSync(`./src/components/${name}/index.ts`, `export * from './${name}'\n`)

  fs.writeFileSync(newComponentPath, componentContent)
}

const addToIndex = (name: string) => {
  const newExport = `
export * from './${name}'`
  const contents = fs.readFileSync(paths.componentsIndex, 'utf8')
  fs.writeFileSync(paths.componentsIndex, contents + newExport)
}

const generateNewComponent = async (name: string) => {
  // Generate Component file
  logger.info('Generating component files')
  createComponentFile(name)

  // Add Component to index
  addToIndex(name)

  // Finish
  logger.success(`Component ${name} created successfully`)
}

export const generateComponent = async () => {
  const promptAnswer = await prompt({
    message: 'What is your component name?',
    name: 'componentName',
    type: 'input',
  })
  // @ts-expect-error: componentName not found on promptAnswer
  const componentName = promptAnswer.componentName as string

  await generateNewComponent(componentName)
}
