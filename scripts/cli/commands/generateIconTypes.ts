import fs from 'fs'

const prefix = `export type IconNames =
  | `

export const generateIconTypes = () => {
  const json = fs.readFileSync('./assets/icomoon/selection.json')

  const types = JSON.parse(json.toString())
    .icons.map((icon: { properties: { name: string } }) => `'${icon.properties.name}'`)
    .join('\n  | ')
    .concat('\n')

  const content = prefix + types

  fs.writeFileSync('./src/types/icon.d.ts', content)
}
