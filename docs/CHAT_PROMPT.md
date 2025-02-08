# CHAT GPT PROMPT:

This prompt generates you a files for Date picker, you can modify it to create some other component like slider or something else

Prompt start:

Hello I've got this datepicker in my code and I want to create similar for emoji picker:

1. Use this library: https://github.com/TheWidlarzGroup/rn-emoji-keyboard
2. Follow code patterns as I provide in my codebase
3. Create similar files like datepicker functionality for emoji picker functionality
4. Give me filenames with code in it

Changed / added files:

1. `src/components/molecules/Field/Field.tsx`

```
import { FieldDatePicker } from './FieldDatePicker'

type FieldComposition = React.FC<PropsWithChildren> & {
  DatePicker: typeof FieldDatePicker
}

const Field: FieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

Field.DatePicker = FieldDatePicker

```

2. `src/components/molecules/Field/FieldDatePicker.tsx`

```
import { forwardRef, useCallback, useImperativeHandle, useRef, useMemo } from 'react'
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native'

import type { FieldDatePickerProps } from './types'

import {
  FormErrorMessage,
  FormLabel,
  Box,
  DatePicker,
  DatePickerRef,
} from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'

export const FieldDatePicker = forwardRef<DatePickerRef, FieldDatePickerProps>(
  (
    {
      errorMessage,
      isInvalid,
      isRequired,
      label,
      labelStyle,
      onBlur,
      onFocus,
      testID,
      onChangeDate,
      ...props
    },
    ref
  ) => {
    const _datePickerRef = useRef<DatePickerRef>(null)

    const { layoutProps, restProps: datePickerProps } = useMemo(
      () => getLayoutProps(props),
      [props]
    )

    const handleFocus = useCallback(() => {
      _datePickerRef?.current?.focus()
    }, [onFocus])

    const handleBlur = useCallback(
      (e?: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur && e && onBlur(e)
        _datePickerRef.current?.blur()
      },
      [onBlur]
    )

    useImperativeHandle(
      ref,
      () => ({
        focus: handleFocus,
        blur: handleBlur,
        ..._datePickerRef.current,
      }),
      [handleBlur, handleFocus]
    )

    return (
      <Box width="100%" gap={1} mb={2} {...layoutProps}>
        <FormLabel
          {...{ isRequired, label, labelStyle }}
          testID={testID + ':label'}
          onLabelPress={handleFocus}
        />
        <DatePicker
          isInvalid={isInvalid || Boolean(errorMessage)}
          onChangeDate={onChangeDate}
          {...datePickerProps}
          ref={_datePickerRef}
          testID={testID + ':input'}
        />
        <FormErrorMessage {...{ errorMessage }} testId={testID + ':error_message'} />
      </Box>
    )
  }
)
```

3. `src/components/molecules/Field/types.ts`

```
import {
  DatePickerProps,
} from '@/design-system'

// -----------------------
// ----- DATEPICKER ------
// -----------------------

export type FieldDatePickerProps = FormLabelProps &
  DatePickerProps & {
    errorMessage?: string
  }
```

4. `src/components/organisms/ControlledField/ControlledDatePicker.tsx`

```
import { useCallback } from 'react'
import { Controller, ControllerProps, FieldValues, get } from 'react-hook-form'

import type { ControlledDatePickerProps } from './types'
import { Field } from '../../molecules'

export const ControlledDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  errors,
  rules,
  children,
  ...props
}: ControlledDatePickerProps<TFieldValues>) => {
  const errorMessage = get(errors, name)?.message

  const renderDatePicker = useCallback(
    ({
      field: { onChange, name, ref, value, ...fieldProps },
    }: Parameters<ControllerProps['render']>[0]) => {
      return (
        <Field.DatePicker
          {...props}
          {...fieldProps}
          date={value}
          ref={ref}
          errorMessage={errorMessage}
          onChangeDate={onChange}
        />
      )
    },
    [errorMessage, props]
  )

  return (
    <Controller
      name={name}
      // @ts-expect-error: For some reason, the type of render is not being inferred correctly
      control={control}
      rules={rules}
      render={renderDatePicker}
    />
  )
}
```

5. `src/components/organisms/ControlledField/ControlledField.tsx`

```
import { ControlledDatePicker } from './ControlledDatePicker'

type ControlledFieldComposition = React.FC<PropsWithChildren> & {
  DatePicker: typeof ControlledDatePicker
}


const ControlledField: ControlledFieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

ControlledField.DatePicker = ControlledDatePicker
```

6. `src/components/organisms/ControlledField/types.ts`

```

// -----------------------
// ----- DATEPICKER ------
// -----------------------

export type ControlledDatePickerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldInputProps,
  'ref'
> &
  ControlledFieldProps<TFieldValues>
```

7. `src/design-system/components/DatePicker.tsx`

```
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

import { useTheme } from '@/hooks'
import { formatDayMonthYear } from '@/utils/dateHelpers'

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

  const [tempDate, setTempDate] = useState<Date>(date ?? new Date())

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
      <Button
        // TODO: Add translations
        title="Save"
        onPress={handleSave}
      />
      <Spacer y={2} />
      <Button.TertiaryColor
        // TODO: Add translations
        title="Cancel"
        onPress={handleCancel}
      />
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
            pr={2}
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
            <Row alignItems="center" gap={2} px={2}>
              <Icon
                name="calendar-2-line"
                size={24}
                color={isInvalid ? 'Error.600' : 'text.primary'}
              />

              <Column py={2} justifyContent="center" gap={2}>
                <Text.MdRegular
                  color={date ? 'text.primary' : isDisabled ? 'text.disabled' : 'text.placeholder'}
                >
                  {date
                    ? formatDayMonthYear(date, 'dd.MM.yyyy', { shouldTransform: false })
                    : placeholder}
                </Text.MdRegular>
              </Column>
            </Row>
          </Touchable>
        </BoxWithShadow>
        {bottomSheet}
      </>
    )
  }
)
```

8. `src/design-system/components/index.ts`

```
export * from './DatePicker'
```

9. `src/design-system/components/types.ts`

```
// -----------------------
// ----- DATEPICKER ------
// -----------------------

export type DatePickerRef = { focus: () => void; blur: () => void }

export type DatePickerProps = TouchableProps & {
  // Logic
  onChangeDate: (newValue: Date) => void
  date?: Date

  // UI
  placeholder?: string
  isDisabled?: boolean
  isInvalid?: boolean
  rightElement?: JSX.Element
  leftElement?: JSX.Element
}
```
