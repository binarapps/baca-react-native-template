import { useSafeAreaInsets, useTheme } from '@baca/hooks'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef } from 'react'
import { Keyboard, StyleSheet, Dimensions, Platform } from 'react-native'

import { CheckboxButton } from './CheckboxButton'
import { Icon } from './Icon'
import { Radio } from './Radio'
import { Text } from './Text'
import { Touchable } from './Touchables/Touchable'
import { SelectKey, SelectItemProps, SelectProps } from './types'
import { BottomSheet } from '../bottomSheets/BottomSheet'
import { BottomSheetFlatList } from '../bottomSheets/BottomSheetScrollables'

const ITEM_HEIGHT = 56
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

  if (maxSelectedItems === 1) {
    return (
      <Radio
        isDisabled={disabled}
        isError={false}
        isSelected={selected}
        label={item.labelInDropdown ?? item.label}
        onChange={onItemSelect}
        size="md"
        pb={4}
      />
    )
  }

  return (
    <CheckboxButton
      onChange={onItemSelect}
      checkboxLablel={item.labelInDropdown ?? item.label}
      isChecked={selected}
      size="md"
      pb={4}
    />
  )
}

export const Select = <T extends SelectKey>({
  placeholder,
  disabled: dropdownDisabled = false,
  items,
  value,
  setValue,
  label,
  maxSelectedItems = 1,
  onOpen,
  isError = false,
}: SelectProps<T>) => {
  const ref = useRef<BottomSheetModal>(null)
  const { colors } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const showDropdown = useCallback(() => {
    onOpen && onOpen()
    Keyboard.dismiss()
    ref?.current?.present?.()
  }, [onOpen])

  const closeDropdown = useCallback(() => {
    ref.current?.snapToPosition(-1)
  }, [])

  const valueToShow = useMemo(() => {
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
          disabled={dropdownDisabled}
        />
      )
    },
    [closeDropdown, dropdownDisabled, maxSelectedItems, setValue, value]
  )

  const keyExtractor = useCallback((item: SelectItemProps<T>) => item.value.toString(), [])

  const getItemLayout = useCallback(
    (_data: ArrayLike<SelectItemProps<T>> | null | undefined, index: number) => {
      return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
    },
    []
  )

  const inputColor = useMemo(() => {
    return isError ? 'text.error.primary' : dropdownDisabled ? 'utility.gray.500' : 'text.primary'
  }, [dropdownDisabled, isError])

  const flatListPaddingBottom = Platform.OS === 'web' ? 0 : 24 + bottom

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
          {valueToShow}
        </Text>
        <Icon color={inputColor} size={22} name="arrow-down-s-line" style={styles.icon} />
      </Touchable>
      <BottomSheet title={label} bottomSheetRef={ref}>
        <BottomSheetFlatList
          style={styles.bottomSheetFlatList}
          contentContainerStyle={[
            styles.bottomSheetContentFlatList,
            { paddingBottom: flatListPaddingBottom },
          ]}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
        />
      </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  bottomSheetContentFlatList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  bottomSheetFlatList: {
    maxHeight: BOTTOM_SHEET_CONTENT_HEIGHT,
  },
  icon: {
    position: 'absolute',
    right: 8,
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
