import { useScreenOptions } from '@baca/hooks'
import { FC, PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from '../KeyboardAwareScrollView'

type FormWrapperProps = {
  edges?: SafeAreaViewProps['edges']
  headerShown?: boolean
  keyboardAwareProps?: KeyboardAwareScrollViewProps
}

export const FormWrapper: FC<PropsWithChildren<FormWrapperProps>> = ({
  children,
  edges,
  headerShown = false,
  keyboardAwareProps = {},
}) => {
  useScreenOptions({ headerShown })
  return (
    <SafeAreaView {...{ edges }} style={styles.safeAreaContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        {...keyboardAwareProps}
        contentContainerStyle={[
          styles.contentContainerStyle,
          keyboardAwareProps.contentContainerStyle,
        ]}
      >
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    alignSelf: 'center',
    flexGrow: 1,
    maxWidth: 360 + 2 * 32, // contentWidth + 2 * paddingHorizontal
    paddingHorizontal: 32,
    width: '100%',
  },
  safeAreaContainer: { flex: 1 },
})
