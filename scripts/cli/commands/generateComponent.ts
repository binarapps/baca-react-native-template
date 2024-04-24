import { prompt } from 'enquirer'

import { COMPONENT_TEMPLATE_PATH, COMPONENTS_PATH } from '../constants'
import { logger } from '../utils'

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')

const paths = {
  template: COMPONENT_TEMPLATE_PATH,
  componentsIndex: COMPONENTS_PATH,
}

const createComponentFile = (name: string, type: string) => {
  const newCommonComponentPath = `./src/components/${name}.tsx`
  const newAtomicComponentPath = `./src/components/${type}s/${name}.tsx`
  const componentFromFile = fs.readFileSync(paths.template, 'utf8')
  const componentContent = componentFromFile.replaceAll('_NAME_', name)

  if (type === 'common') {
    fs.writeFileSync(newCommonComponentPath, componentContent)
    return
  }
  fs.writeFileSync(newAtomicComponentPath, componentContent)
}

const addToIndex = (name: string, type: string) => {
  const atomicComponentIndexPath = `./src/components/${type}s/index.ts`
  const newExport = `
export * from './${name}'`
  if (type === 'common') {
    const contents = fs.readFileSync(paths.componentsIndex, 'utf8')
    fs.writeFileSync(paths.componentsIndex, contents + newExport)

    return
  }

  const contents = fs.readFileSync(atomicComponentIndexPath, 'utf8')
  fs.writeFileSync(atomicComponentIndexPath, contents + newExport)
}

const generateNewComponent = async (name: string, type: string) => {
  // Generate Component file
  logger.info('Generating component files')
  createComponentFile(name, type)

  // Add Component to index
  addToIndex(name, type)

  // Finish
  logger.success(`Component ${name} created successfully`)
}

export const generateComponent = async () => {
  const componentTypes = [
    { name: 'Molecule', value: 'molecule' },
    { name: 'Organism', value: 'organism' },
    { name: 'Common', value: 'common' },
  ]

  const promptAnswer = await prompt([
    {
      message: 'What is your component type?',
      name: 'componentType',
      type: 'select',
      choices: componentTypes,
    },
    {
      message: 'What is your component name?',
      name: 'componentName',
      type: 'input',
    },
  ])
  // @ts-expect-error: componentType not found on promptAnswer
  const componentType = promptAnswer.componentType as string
  // @ts-expect-error: componentName not found on promptAnswer
  const componentName = promptAnswer.componentName as string

  await generateNewComponent(componentName, componentType)
}
