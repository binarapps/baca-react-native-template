import { useTheme } from '@baca/hooks'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { Keyboard, StyleSheet, Dimensions, Platform, useWindowDimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Box } from './Box'
import { Icon } from './Icon'
import { Row } from './Row'
import { Text } from './Text'
import { Touchable } from './Touchables/Touchable'
import { SelectKey, SelectItemProps, SelectProps } from './types'
import { BottomSheet } from '../bottomSheets/BottomSheet'
import { BottomSheetFlashList } from '../bottomSheets/BottomSheetFlashList'

const BOTTOM_SHEET_CONTENT_HEIGHT = Dimensions.get('screen').height / 1.5

const SelectItem = <T extends SelectKey>({
  item,
  setValue,
  maxSelectedItems,
  closeDropdown,
  value,
  disabled,
}: {
  item: SelectItemProps<T>
  setValue: (newValue: T[]) => void
  maxSelectedItems: number
  closeDropdown: () => void
  value: T[]
  disabled: boolean
}) => {
  const selected = value?.includes(item.value)
  const { colors } = useTheme()

  const onItemSelect = useCallback(() => {
    if (maxSelectedItems === 1) {
      setValue([item.value])
      closeDropdown()
      return
    }
    const newValue = [...value].filter((el) => el)
    if (value?.includes(item.value)) {
      const index = newValue.indexOf(item.value)
      newValue.splice(index, 1)
      setValue(newValue)
      return
    }
    if (value?.length < maxSelectedItems) {
      newValue.push(item.value)
      setValue(newValue)
    }
  }, [closeDropdown, item.value, maxSelectedItems, setValue, value])

  const color = useMemo(
    () => (disabled && !selected ? colors.bg.brand.primary : colors.bg.active),
    [disabled, selected, colors]
  )

  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onItemSelect}>
      {maxSelectedItems === 1 ? (
        <Row my={2} flex={1} alignItems="center">
          <Text>{item.labelInDropdown ?? item.label}</Text>
        </Row>
      ) : null}
      {maxSelectedItems > 1 ? (
        <Row mb={4}>
          <Box
            borderRadius={5}
            borderColor={disabled && !selected ? 'border.disabled' : 'border.brand'}
            borderWidth={1}
            width={5}
            height={5}
            mr={4}
            justifyContent="center"
            alignItems="center"
          >
            {selected ? <Icon color="icon.fg.brand" name="check-fill" size={18} /> : null}
          </Box>
          <Row flex={1} alignItems="center">
            <Text style={{ color }}>{item.labelInDropdown ?? item.label}</Text>
          </Row>
        </Row>
      ) : null}
    </TouchableOpacity>
  )
}

export const Select = <T extends SelectKey>({
  placeholder,
  disabled: dropdownDisabled = false,
  items,
  value,
  setValue,
  maxSelectedItems = 1,
  onOpen,
  isError = false,
}: SelectProps<T>) => {
  const ref = useRef<BottomSheetModal>(null)
  const { colors } = useTheme()
  const { width: windowWidth } = useWindowDimensions()

  const showDropdown = useCallback(() => {
    onOpen && onOpen()
    Keyboard.dismiss()
    ref?.current?.present?.()
  }, [onOpen])

  const closeDropdown = useCallback(() => {
    ref.current?.snapToPosition(-1)
  }, [])

  const disabled = useMemo(
    () => value?.length === maxSelectedItems,
    [maxSelectedItems, value?.length]
  )

  const label = useMemo(() => {
    let retVal = ''
    const selectedItems = items?.filter((item) => value.includes(item.value)) ?? []
    if (selectedItems?.length === 0) {
      return placeholder ?? ''
    }
    for (const item of selectedItems) {
      retVal += `${item.label}, `
    }
    retVal = retVal.slice(0, -2)
    return retVal
  }, [items, placeholder, value])

  const renderItem = useCallback(
    ({ item }: { item: SelectItemProps<T> }) => {
      return (
        <SelectItem
          key={item.label}
          item={item}
          setValue={setValue}
          maxSelectedItems={maxSelectedItems}
          closeDropdown={closeDropdown}
          value={value}
          disabled={disabled}
        />
      )
    },
    [closeDropdown, disabled, maxSelectedItems, setValue, value]
  )

  const keyExtractor = useCallback((item: SelectItemProps<T>) => item.value.toString(), [])

  const inputColor = useMemo(() => {
    return isError ? 'text.error.primary' : dropdownDisabled ? 'utility.gray.500' : 'text.primary'
  }, [dropdownDisabled, isError])

  const contentWidth = Platform.OS === 'web' ? Math.min(windowWidth * 0.4, 400) : 'auto'

  return (
    <>
      <Touchable disabled={dropdownDisabled} onPress={showDropdown} justifyContent="center">
        <Text
          numberOfLines={1}
          style={[
            styles.textInput,
            isError
              ? { borderColor: colors.text.error.primary }
              : { borderColor: colors.border.primary },
          ]}
          color={inputColor}
        >
          {label}
        </Text>
        <Icon color={inputColor} size={22} name="arrow-down-s-line" style={styles.icon} />
      </Touchable>
      <BottomSheet title={label} bottomSheetRef={ref}>
        <Box
          pb={6}
          px={4}
          style={{
            height: BOTTOM_SHEET_CONTENT_HEIGHT,
            width: contentWidth,
          }}
        >
          <BottomSheetFlashList
            data={items}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            estimatedItemSize={51}
            showsVerticalScrollIndicator={windowWidth > 400}
          />
        </Box>
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 8,
  },
  itemWrapper: {
    paddingVertical: 8,
  },
  textInput: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 28,
    paddingVertical: 12,
  },
})

// import { useTheme } from '@baca/hooks'
// import { BottomSheetModal } from '@gorhom/bottom-sheet'
// import { useCallback, useMemo, useRef } from 'react'
// import { Keyboard, StyleSheet, Dimensions, Platform } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'

// import { Box } from './Box'
// import { Icon } from './Icon'
// import { Row } from './Row'
// import { Text } from './Text'
// import { Touchable } from './Touchables/Touchable'
// import { SelectKey, SelectItemProps, SelectProps } from './types'
// import { BottomSheet } from '../bottomSheets/BottomSheet'
// import { BottomSheetFlashList } from '../bottomSheets/BottomSheetFlashList'

// const BOTTOM_SHEET_CONTENT_HEIGHT = Dimensions.get('screen').height / 1.5
// const BOTTOM_SHEET_CONTENT_WIDTH = Dimensions.get('screen').width / 3

// const SelectItem = <T extends SelectKey>({
//   item,
//   setValue,
//   maxSelectedItems,
//   closeDropdown,
//   value,
//   disabled,
// }: {
//   item: SelectItemProps<T>
//   setValue: (newValue: T[]) => void
//   maxSelectedItems: number
//   closeDropdown: () => void
//   value: T[]
//   disabled: boolean
// }) => {
//   const selected = value?.includes(item.value)
//   const { colors } = useTheme()

//   const onItemSelect = useCallback(() => {
//     if (maxSelectedItems === 1) {
//       setValue([item.value])
//       closeDropdown()
//       return
//     }
//     const newValue = [...value].filter((el) => el)
//     if (value?.includes(item.value)) {
//       const index = newValue.indexOf(item.value)
//       newValue.splice(index, 1)
//       setValue(newValue)
//       return
//     }
//     if (value?.length < maxSelectedItems) {
//       newValue.push(item.value)
//       setValue(newValue)
//     }
//   }, [closeDropdown, item.value, maxSelectedItems, setValue, value])

//   const color = useMemo(
//     () => (disabled && !selected ? colors.bg.brand.primary : colors.bg.active),
//     [disabled, selected, colors]
//   )

//   return (
//     <TouchableOpacity style={styles.itemWrapper} onPress={onItemSelect}>
//       {maxSelectedItems === 1 ? (
//         <Row my={2} flex={1} alignItems="center">
//           <Text>{item.labelInDropdown ?? item.label}</Text>
//         </Row>
//       ) : null}
//       {maxSelectedItems > 1 ? (
//         <Row mb={4}>
//           <Box
//             borderRadius={5}
//             borderColor={disabled && !selected ? 'border.disabled' : 'border.brand'}
//             borderWidth={1}
//             width={5}
//             height={5}
//             mr={4}
//             justifyContent="center"
//             alignItems="center"
//           >
//             {selected ? <Icon color="icon.fg.brand" name="check-fill" size={18} /> : null}
//           </Box>
//           <Row flex={1} alignItems="center">
//             <Text style={{ color }}>{item.labelInDropdown ?? item.label}</Text>
//           </Row>
//         </Row>
//       ) : null}
//     </TouchableOpacity>
//   )
// }

// export const Select = <T extends SelectKey>({
//   placeholder,
//   disabled: dropdownDisabled = false,
//   items,
//   value,
//   setValue,
//   maxSelectedItems = 1,
//   onOpen,
//   isError = false,
// }: SelectProps<T>) => {
//   const ref = useRef<BottomSheetModal>(null)
//   const { colors } = useTheme()

//   const showDropdown = useCallback(() => {
//     onOpen && onOpen()
//     Keyboard.dismiss()
//     ref?.current?.present?.()
//   }, [onOpen])

//   const closeDropdown = useCallback(() => {
//     ref.current?.snapToPosition(-1)
//   }, [])

//   const disabled = useMemo(
//     () => value?.length === maxSelectedItems,
//     [maxSelectedItems, value?.length]
//   )

//   const label = useMemo(() => {
//     let retVal = ''
//     const selectedItems = items?.filter((item) => value.includes(item.value)) ?? []
//     if (selectedItems?.length === 0) {
//       return placeholder ?? ''
//     }
//     for (const item of selectedItems) {
//       retVal += `${item.label}, `
//     }
//     retVal = retVal.slice(0, -2)
//     return retVal
//   }, [items, placeholder, value])

//   const renderItem = useCallback(
//     ({ item }: { item: SelectItemProps<T> }) => {
//       return (
//         <SelectItem
//           key={item.label}
//           item={item}
//           setValue={setValue}
//           maxSelectedItems={maxSelectedItems}
//           closeDropdown={closeDropdown}
//           value={value}
//           disabled={disabled}
//         />
//       )
//     },
//     [closeDropdown, disabled, maxSelectedItems, setValue, value]
//   )

//   const keyExtractor = useCallback((item: SelectItemProps<T>) => item.value.toString(), [])

//   const inputColor = useMemo(() => {
//     return isError ? 'text.error.primary' : dropdownDisabled ? 'utility.gray.500' : 'text.primary'
//   }, [dropdownDisabled, isError])

//   return (
//     <>
//       <Touchable disabled={dropdownDisabled} onPress={showDropdown} justifyContent="center">
//         <Text
//           numberOfLines={1}
//           style={[
//             styles.textInput,
//             isError
//               ? { borderColor: colors.text.error.primary }
//               : { borderColor: colors.border.primary },
//           ]}
//           color={inputColor}
//         >
//           {label}
//         </Text>
//         <Icon color={inputColor} size={22} name="arrow-down-s-line" style={styles.icon} />
//       </Touchable>
//       <BottomSheet title={label} bottomSheetRef={ref}>
//         <Box
//           pb={6}
//           px={4}
//           style={{
//             height: BOTTOM_SHEET_CONTENT_HEIGHT,
//             maxWidth: Platform.OS === 'web' ? BOTTOM_SHEET_CONTENT_WIDTH : 'auto',
//           }}
//         >
//           <BottomSheetFlashList
//             data={items}
//             keyExtractor={keyExtractor}
//             renderItem={renderItem}
//             estimatedItemSize={51}
//           />
//         </Box>
//       </BottomSheet>
//     </>
//   )
// }

// const styles = StyleSheet.create({
//   icon: {
//     position: 'absolute',
//     right: 8,
//   },
//   itemWrapper: {
//     paddingVertical: 8,
//   },
//   textInput: {
//     alignItems: 'center',
//     borderRadius: 8,
//     borderWidth: 1,
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 10,
//     paddingRight: 28,
//     paddingVertical: 12,
//   },
// })
