import { useTheme } from '@baca/hooks'
import { hex2rgba } from '@baca/utils'
import {
  Modal as RNModal,
  ModalProps,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  StyleSheet,
  Dimensions,
} from 'react-native'

import { KeyboardAwareScrollView } from './KeyboardAwareScrollView'

type Props = {
  visible: boolean
  onRequestClose: () => void
  children: JSX.Element
  additionalWrapperStyle?: ViewStyle
  scrollable?: boolean
} & ModalProps

export const Modal = ({
  visible,
  onRequestClose,
  additionalWrapperStyle,
  scrollable = true,
  children,
  ...rest
}: Props): JSX.Element => {
  const { colors } = useTheme()
  const ScrollableComponent = scrollable ? KeyboardAwareScrollView : View

  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <SafeAreaView style={[styles.modal, additionalWrapperStyle]}>
          <ScrollableComponent
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { background: hex2rgba(colors.bg.overlay, 0.5) },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
          </ScrollableComponent>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scroll: {
    width: '100%',
  },
  scrollContent: {
    justifyContent: 'center',
    paddingHorizontal: Dimensions.get('window').width < 450 ? 16 : 32,
  },
})
