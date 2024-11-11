import { Portal } from '@gorhom/portal'
import React, { NamedExoticComponent, PropsWithChildren, memo, useEffect } from 'react'
import { View, Modal, Dimensions, Platform } from 'react-native'

import { MenuItem } from '../../molecules/MenuItem'

import { useColorScheme } from '@/contexts'
import { Box, TouchableProps, ScrollView, Pressable } from '@/design-system'
import { useRef, useState, useMemo, useTheme, useCallback } from '@/hooks'

type TriggerPosition = {
  x: number
  y: number
  width: number
  height: number
} | null
type TriggerState = {
  isOpen: boolean
}
export type MenuProps = {
  trigger: (props: TouchableProps, state: TriggerState) => JSX.Element
  onOpen?: () => void
  onClose?: () => void
  closeOnSelect?: boolean
  isOpen?: boolean
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'right'
  scrollable?: boolean
} & PropsWithChildren

type MenuComposition = NamedExoticComponent<MenuProps> & {
  Item: typeof MenuItem
}

const Menu = memo<MenuProps>(
  ({
    trigger,
    onOpen,
    onClose,
    closeOnSelect = true,
    scrollable = false,
    placement = 'bottomLeft',
    ...props
  }) => {
    const { colorScheme } = useColorScheme()
    const { shadows } = useTheme()
    const _modalRef = useRef<Modal>(null)
    const _triggerContainer = useRef<View>(null)
    const [triggerPosition, setTriggerPosition] = useState<TriggerPosition>(null)
    const [isOpen, setOpen] = useState(props.isOpen || false)

    const _measureTriggerPosition = useCallback(() => {
      _triggerContainer.current?.measureInWindow((x, y, width, height) => {
        switch (placement) {
          case 'top':
            setTriggerPosition({ x, y: y - height, width, height })
            return
          case 'topLeft':
            setTriggerPosition({ x: x - width, y: y - height, width, height })
            return
          case 'topRight':
            setTriggerPosition({ x: x + width, y: y - height, width, height })
            return
          case 'bottom':
            setTriggerPosition({ x, y: y + height, width, height })
            return
          case 'bottomLeft':
            setTriggerPosition({ x: x - width, y: y + height, width, height })
            return
          case 'bottomRight':
            setTriggerPosition({ x: x + width, y: y + height, width, height })
            return
          case 'left':
            setTriggerPosition({ x: x - width, y, width, height })
            return
          case 'right':
            x = x + width
            setTriggerPosition({ x: x + width, y, width, height })
            return
          default:
            // default is bottomLeft
            setTriggerPosition({ x, y: y + height, width, height })
        }
      })
    }, [placement])

    useEffect(() => {
      if (isOpen && !triggerPosition && Platform.OS === 'ios') {
        _measureTriggerPosition()
      }
    }, [_measureTriggerPosition, isOpen, triggerPosition])

    const handleOpen = useCallback(() => {
      setOpen(true)
      onOpen?.()
    }, [onOpen])

    const handleClose = useCallback(() => {
      setOpen(false)
      onClose?.()
    }, [onClose])

    const triggerTouchableProps = useMemo<TouchableProps>(
      () => ({
        onPress: handleOpen,
      }),
      [handleOpen]
    )

    return (
      <>
        <View
          onLayout={Platform.OS !== 'ios' ? _measureTriggerPosition : undefined}
          ref={_triggerContainer}
        >
          {trigger(triggerTouchableProps, { isOpen })}
        </View>
        <Portal>
          <Modal
            ref={_modalRef}
            animationType="fade"
            transparent
            visible={isOpen}
            onRequestClose={handleClose}
          >
            <Pressable
              onPress={handleClose}
              flex={1}
              bg={colorScheme === 'light' ? 'Base.black' : 'Base.white'}
              bgOpacity={0.2}
            >
              {triggerPosition && (
                <Box
                  position="absolute"
                  top={triggerPosition?.y}
                  {...(placement.toLocaleLowerCase().includes('right')
                    ? { right: Dimensions.get('window').width - triggerPosition?.x }
                    : { left: triggerPosition?.x })}
                  p={2}
                  backgroundColor="bg.primary"
                  borderRadius={4}
                  {...shadows['4']}
                >
                  <ScrollView scrollEnabled={scrollable}>
                    {React.Children.map(props.children, (child) => {
                      if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                          ...child.props,
                          onPress: () => {
                            if (closeOnSelect) {
                              handleClose()
                            }
                            child.props.onPress?.()
                          },
                        })
                      }
                      return child
                    })}
                  </ScrollView>
                </Box>
              )}
            </Pressable>
          </Modal>
        </Portal>
      </>
    )
  }
) as MenuComposition

Menu.Item = MenuItem

export { Menu }
