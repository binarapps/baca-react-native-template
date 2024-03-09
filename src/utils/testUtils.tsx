import i18n from '@baca/i18n/i18nForTests'
import { ColorSchemeProvider } from '@baca/providers/ColorSchemeProvider'
import { PortalProvider } from '@gorhom/portal'
import { render, RenderAPI } from '@testing-library/react-native'
import { PropsWithChildren, ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'

type RenderOptions = Parameters<typeof render>[1]

const ProvidersWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <PortalProvider>
    <ColorSchemeProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ColorSchemeProvider>
  </PortalProvider>
)

const customRender = (ui: ReactElement, options?: RenderOptions): RenderAPI => {
  return render(ui, { wrapper: ProvidersWrapper, ...options })
}

export * from '@testing-library/react-native'
export { customRender as render }
