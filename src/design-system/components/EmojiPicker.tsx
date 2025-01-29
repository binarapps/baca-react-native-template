import { forwardRef, useCallback, useImperativeHandle } from 'react'
import { StyleSheet } from 'react-native'
import EmojiKeyboard from 'rn-emoji-keyboard'

import { BoxWithShadow } from './BoxWithShadow'
import { Icon } from './Icon'
import { Row } from './Row'
import { Text } from './Text'
import { Touchable } from './Touchables'
import { EmojiPickerProps, EmojiPickerRef } from './types'

import { useBoolean, useTheme } from '@/hooks'
import { hex2rgba } from '@/utils'

export const EmojiPicker = forwardRef<EmojiPickerRef, EmojiPickerProps>(
  ({ emoji, onChangeEmoji, placeholder, isDisabled, isInvalid, ...props }, ref) => {
    const [isOpen, setIsOpen] = useBoolean(false)
    const { colors } = useTheme()

    const clearEmoji = useCallback(() => {
      onChangeEmoji({
        emoji: '',
        name: '',
        slug: '',
      })
    }, [onChangeEmoji])

    useImperativeHandle(
      ref,
      () => ({
        focus: setIsOpen.on,
        blur: setIsOpen.off,
      }),
      [setIsOpen.on, setIsOpen.off]
    )

    return (
      <>
        <BoxWithShadow isInvalid={isInvalid}>
          <Touchable
            onPress={setIsOpen.on}
            width="100%"
            minW={48}
            disabled={isDisabled}
            alignItems="center"
            borderColor={
              isDisabled ? 'border.disabled' : isInvalid ? 'border.error' : 'border.primary'
            }
            bg={isDisabled ? 'bg.disabled_subtle' : 'bg.primary'}
            borderRadius={8}
            borderWidth={1}
            flexDirection="row"
            overflow="hidden"
            {...props}
          >
            <Row
              alignItems="center"
              gap={2}
              px={2}
              py={2}
              justifyContent="space-between"
              width={'100%'}
            >
              <Text.MdRegular
                style={emoji?.emoji ? styles.input : undefined}
                color={emoji?.emoji ? 'text.primary' : 'text.placeholder'}
              >
                {emoji?.emoji || placeholder}
              </Text.MdRegular>
              {emoji?.emoji ? (
                <Touchable right={0} onPress={clearEmoji}>
                  <Icon name="close-line" color="text.primary" size={18} />
                </Touchable>
              ) : null}
            </Row>
          </Touchable>
        </BoxWithShadow>
        {/* FIXME: Emoji picker is not looking nice on web and bigger screens, we need to do something with that */}
        <EmojiKeyboard
          open={isOpen}
          onClose={setIsOpen.off}
          onEmojiSelected={(selectedEmoji) => {
            onChangeEmoji(selectedEmoji)
            setIsOpen.off()
          }}
          theme={{
            backdrop: hex2rgba(colors.bg.primary, 0.2),
            header: colors.text.primary,
            container: colors.bg.primary,
            knob: colors.border.primary,
            category: {
              icon: colors.text.secondary,
              iconActive: colors.text.primary,
              container: colors.bg.quaternary,
              containerActive: colors.bg.active,
            },
            search: {
              text: colors.text.primary,
              placeholder: colors.text.placeholder,
              icon: colors.text.primary,
              background: colors.bg.primary,
            },
          }}
          enableSearchBar
        />
      </>
    )
  }
)

const styles = StyleSheet.create({
  input: {
    fontFamily: 'system',
  },
})
