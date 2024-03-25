import { useScreenOptions } from '@baca/hooks'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'

import { KeyboardAwareScrollView } from '../KeyboardAwareScrollView'

export const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  useScreenOptions({ headerShown: false })
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
      {children}
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignSelf: 'center',
    flex: 1,
    flexGrow: 1,
    maxWidth: 360,
    width: '100%',
  },
})
