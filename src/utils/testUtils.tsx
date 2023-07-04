import { NavigationContainer } from '@react-navigation/native'
import { render, RenderAPI } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { PropsWithChildren, ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

import i18n from '~i18n/i18nForTests'
import { ColorSchemeProvider } from '~providers/ColorSchemeProvider'

type RenderOptions = Parameters<typeof render>[1]

const nbInitialWindowMetrics = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
}

const ProvidersWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <NativeBaseProvider initialWindowMetrics={nbInitialWindowMetrics}>
    <NavigationContainer>
      <ColorSchemeProvider>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </ColorSchemeProvider>
    </NavigationContainer>
  </NativeBaseProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions): RenderAPI => {
  return render(ui, { wrapper: ProvidersWrapper, ...options })
}

export * from '@testing-library/react-native'
export { customRender as render }
