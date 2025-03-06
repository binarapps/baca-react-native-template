import dayjs from 'dayjs'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DateTimePicker from 'react-native-ui-datepicker'
import { DatePickerSingleProps } from 'react-native-ui-datepicker/lib/typescript/src/DateTimePicker'

import { Box } from './Box'
import { BoxWithShadow } from './BoxWithShadow'
import { Button } from './Button'
import { Column } from './Column'
import { Icon } from './Icon'
import { Row } from './Row'
import { Spacer } from './Spacer'
import { Text } from './Text'
import { Touchable } from './Touchables'
import { DatePickerProps, DatePickerRef } from './types'
import { useBottomSheet } from '../bottomSheets'

import { useTheme, useTranslation } from '@/hooks'

export type DateTypes = 'protected' | 'email' | 'light' | undefined

type DatePickerModalProps = {
  date?: Date
  setDate(date: Date): void
  onChangeDate: ((date: Date) => void) | undefined
  maximumDate?: Date
  minimumDate?: Date
  onSave?: () => void
}

const DatePickerModal = ({ date, setDate, onChangeDate, onSave }: DatePickerModalProps) => {
  const { bottom } = useSafeAreaInsets()
  const { colors } = useTheme()
  const { t } = useTranslation()

  const [tempDate, setTempDate] = useState<Date>(date || new Date())

  const onChange: NonNullable<DatePickerSingleProps['onChange']> = useCallback((params) => {
    if (!params.date) return

    const newDate = dayjs(params.date).toDate()

    setTempDate(newDate)
  }, [])

  const handleSave = useCallback(() => {
    setDate(tempDate)
    onChangeDate?.(tempDate)
    onSave?.()
  }, [tempDate, setDate, onChangeDate])

  const handleCancel = useCallback(() => {
    setTempDate(date ?? new Date())
    onSave?.()
  }, [date])

  return (
    <Box bg="bg.primary" px={4} pt={4} pb={`${bottom + 16}px`}>
      <DateTimePicker
        mode="single"
        date={tempDate}
        locale={'en'}
        displayFullDays
        timePicker={false}
        onChange={onChange}
        headerButtonColor={colors.button.primary.bg}
        selectedItemColor={colors.button.primary.bg}
        selectedTextStyle={{
          color: colors.button.primary.fg,
        }}
        todayContainerStyle={styles.todayContainerStyle}
        calendarTextStyle={{
          color: colors.text.primary,
        }}
        headerTextStyle={{
          color: colors.text.primary,
        }}
        weekDaysTextStyle={{
          color: colors.text.primary,
        }}
      />
      <Spacer y={4} />
      <Button title={t('common.save')} onPress={handleSave} />
      <Spacer y={2} />
      <Button.TertiaryColor title={t('common.cancel')} onPress={handleCancel} />
    </Box>
  )
}

const styles = StyleSheet.create({
  todayContainerStyle: {
    borderWidth: 1,
  },
})

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  ({ children, style, isDisabled, isInvalid, date, onChangeDate, placeholder, ...props }, ref) => {
    const _datePickerRef = useRef<DatePickerRef>(null)

    const { bottomSheetComponentRenderFunction, closeBottomSheet, presentBottomSheet } =
      useBottomSheet({
        title: placeholder,
        isDivider: false,
      })

    const handleClear = useCallback(() => {
      if (!onChangeDate) {
        return
      }
      if (isDisabled) {
        return
      }

      onChangeDate(undefined)
    }, [isDisabled, onChangeDate])

    const bottomSheet = bottomSheetComponentRenderFunction(
      <DatePickerModal
        date={date}
        setDate={onChangeDate}
        onChangeDate={onChangeDate}
        onSave={closeBottomSheet}
      />
    )

    useImperativeHandle(
      ref,
      () => ({
        focus: presentBottomSheet,
        blur: closeBottomSheet,
        ..._datePickerRef.current,
      }),
      [closeBottomSheet, presentBottomSheet]
    )

    return (
      <>
        <BoxWithShadow isInvalid={isInvalid}>
          <Touchable
            onPress={presentBottomSheet}
            width="100%"
            minW={48}
            px={2}
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
            <Row alignItems="center" gap={2} width="100%">
              <Icon
                name="calendar-2-line"
                size={24}
                color={isInvalid ? 'Error.600' : 'text.primary'}
              />

              <Column py={2} justifyContent="center" gap={2} flexGrow={1}>
                <Text.MdRegular
                  color={date ? 'text.primary' : isDisabled ? 'text.disabled' : 'text.placeholder'}
                >
                  {date ? dayjs(date).format('DD/MM/YYYY') : placeholder}
                </Text.MdRegular>
              </Column>
              {date && (
                <Touchable
                  onPress={handleClear}
                  disabled={isDisabled}
                  hitSlop={12}
                  borderRadius={8}
                >
                  <Icon
                    name="close-line"
                    size={24}
                    color={isInvalid ? 'Error.600' : 'text.primary'}
                  />
                </Touchable>
              )}
            </Row>
          </Touchable>
        </BoxWithShadow>
        {bottomSheet}
      </>
    )
  }
)
