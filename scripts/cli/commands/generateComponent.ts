import promptSync from 'prompt-sync'

import { COMPONENT_TEMPLATE_PATH, COMPONENTS_PATH } from '../constants'
import { logger } from '../utils'

const prompt = promptSync()

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const selectPrompt = require('select-prompt')

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
    { title: 'Molecule', value: 'molecule' },
    { title: 'Organism', value: 'organism' },
    { title: 'Common', value: 'common' },
  ]

  selectPrompt('Select type for new component', componentTypes, {
    cursor: 0,
  }).on('submit', async (type: string) => {
    const name = prompt('What is component name? ')

    if (!name) {
      return logger.error('No component name passed')
    }

    // 1. New component -> component_name + component_type (atom | molecule | organism | common)
    await generateNewComponent(name, type)
  })
}
