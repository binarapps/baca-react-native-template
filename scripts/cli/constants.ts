export const CLI_ACTIONS = ['generate', 'g', 'bootstrap', 'b']

export const APP_ROUTER_DIRECTORY = 'app/(app)'
export const SCREENS_DIRECTORY = 'src/screens'

// Paths
export const NAVIGATION_CONFIG_PATH = 'navigation/tabNavigator/navigation-config.ts'
export const APP_JSON_PATH = 'app.json'
export const APP_CONFIG_PATH = 'app.config.ts'
export const README_PATH = 'README.md'

export const COMPONENTS_PATH = 'src/components/index.ts'
export const COMPONENT_TEMPLATE_PATH = 'templates/component_template.tsx'
export const README_TEMPLATE_PATH = 'templates/readme_template.md'
export const PULL_REQUEST_TEMPLATE_PATH = '.github/pull_request_template.md'
export const NEW_PULL_REQUEST_TEMPLATE_PATH = 'templates/pull_request_template.md'

// Files
export const NEW_TAB_LAYOUT_FILE = `import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function DynamicLayout() {
  return <Stack />
}
`
