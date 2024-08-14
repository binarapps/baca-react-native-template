# Components

Components in [baca-react-native-template](https://github.com/binarapps/baca-react-native-template) follows [atomic design methodology](https://atomicdesign.bradfrost.com/).

For more information on such a design methodology, visit the page above.
On the other hand, below you can find documentation of the implemented components

# Atoms

## Absolute

**Absolute** is used as a container that positions its elements absolutely.

### Usage

```tsx
import { Absolute } from '@baca/components'

const MyComponent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Absolute>{children}</Absolute>
)

export default MyComponent
```

### Props

**Absolute** extends [IBoxProps](https://docs.nativebase.io/box#h2-props) with a preset **_position_** property to `absolute`.

<hr />

## AbsoluteFullFill

**AbsoluteFullFill** is used as a container that fullfills its children on a screen.

### Usage

```tsx
import { AbsoluteFullFill } from '@baca/components'

const MyComponent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AbsoluteFullFill>{children}</AbsoluteFullFill>
)

export default MyComponent
```

### Props

**AbsoluteFullFill** extends [IBoxProps](https://docs.nativebase.io/box#h2-props) with a preset **_position_** property to `absolute`.

## Input

The **Input** component allows user to provide input in a text field.

### Usage

```tsx
import { Input, AbsoluteFullFill } from '@baca/components'

const MyComponent: React.FC = () => (
  <AbsoluteFullFill>
    <Input
      enterKeyHint="next"
      label="E-mail"
      inputMode="email"
      autoCapitalize="none"
      placeholder="E-mail placeholder"
    />
  </AbsoluteFullFill>
)

export default MyComponent
```

### Props

**Input** extends [IInputProps](https://docs.nativebase.io/input#h2-props).

**secureTextIconName**

_type_: `Feather icon **Glyph**`

_default value_: `undefined`

**secureTextIconColor**

_type_: `string` | `undefined`

_default value_: `undefined`

**secureTextIconSize**

_type_: `number` | `undefined`

_default value_: `24`

## Spacer

The **Spacer** component is used to pass space between components in a render tree.

### Usage

```tsx
import { Spacer, Input, Container } from '@baca/components'

const MyComponent: React.FC = () => (
  <Container>
    <Input
      autoCapitalize="none"
      enterKeyHint="next"
      inputMode="email"
      label="E-mail"
      placeholder="E-mail placeholder"
    />
    <Spacer y="8" flex={1} />
    <Input
      autoCapitalize="none"
      enterKeyHint="next"
      inputMode="email"
      label="Confirm e-mail"
      placeholder="Confirm e-mail placeholder"
    />
  </Container>
)

export default MyComponent
```

### Props

**x**

Spacer value on x-axis.

_type_: `keyof Theme['space']` | `undefined`

_default value_: `'0'`

**y**

Spacer value on y-axis.

_type_: `keyof Theme['space']` | `undefined`

_default value_: `'0'`

**flex**

_type_: `ViewStyle['flex']` | `undefined`

# Molecules

## Field

_Field_ component wraps _Input_ and _Checkbox_ with an additional helper fields such as _HelperText_, _ErrorMessage_ and _Label_.
Used standalone gives an only _Fragment_ wrapper for its children and can be used for anything with no special effect.

## _Field.Input_

_Field.Input_ is an _Input_ under _FormController_ with a _FormController_ helper components (check description of a _Field_ above).

### Props

_Field.Input_ extends _InputProps_ (check _Input_ above) and:

**label**

Label value of a _Field.Input_.

_type_: `string` | `undefined`

**helperText**

Helper text of a _Field.Input_.

_type_: `string` | `undefined`

**errorMessage**

Error message of a _Field.Input_.

_type_: `string` | `undefined`

**errorIcon**

Error icon of a _Field.Input_.

_type_: `JSX.Element` | `undefined`

### Usage

```tsx
import { Field } from '@baca/components'

const MyComponent: React.FC = () => (
  <Field.Input
    autoCapitalize="none"
    enterKeyHint="next"
    inputMode="email"
    isRequired
    label="Email"
    placeholder="Email placeholder"
  />
)

export default MyComponent
```

## _Field.Checkbox_

_Field.Checkbox_ is a _Checkbox_ under _FormController_ with a _FormController_ helper components (check description of a _Field_ above).

### Props

_Field.Checkbox_ extends _ICheckboxProps_, _IFormControlProps_ and:

**label**

Label value of a _Field.Checkbox_.

_type_: `string` | `undefined`

### Usage

```tsx
import { Field } from '@baca/components'

const MyComponent: React.FC = () => (
  <Field.CheckboxGroup isRequired autoCapitalize="none" label="Confirm" />
)

export default MyComponent
```

# Organisms

## ControlledField

_ControlledField_ component wraps _Field_ (check above) with a _Control_ from `react-hook-form`.
Used standalone gives an only _Fragment_ wrapper for its children and can be used for anything with no special effect.

## _ControlledField.Input_

_ControlledField.Input_ is a _Field.Input_ (check above) with a `react-hook-form` _Control_.

### Props

_ControlledField.Input_ extends _FieldInputProps_ and:

**name**

Name of a controlled field.

_type_: `Path<any>`

**control**

Field control prop.

_type_: `Control<any>`

**errors**

Here form controller provides form errors after validation.

_type_: `FieldErrors<any>`

### Usage

```tsx
import { useForm } from 'react-hook-form'

import { ControlledField } from '@baca/components'

const MyComponent: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  })

  return (
    <ControlledField.Input
      {...{ control, errors }}
      autoCapitalize="none"
      enterKeyHint="next"
      inputMode="email"
      isRequired
      label="Email"
      name="email"
      onSubmitEditing={passwordInputRef.current?.focus}
      placeholder="Email placeholder"
      rules={{
        required: 'Required',
        pattern: {
          value: REGEX.EMAIL,
          message: 'Invalid format',
        },
      }}
      testID="emailInput"
    />
  )
}

export default MyComponent
```

## _ControlledField.Checkbox_

_ControlledField.Checkbox_ is a _Field.Checkbox_ (check above) with a `react-hook-form` _Control_.

### Props

_ControlledField.Checkbox_ extends _FieldCheckboxProps_ omitting `value` and:

**name**

Name of a controlled field.

_type_: `Path<any>`

**control**

Field control prop.

_type_: `Control<any>`

**errors**

Here form controller provides form errors after validation.

_type_: `FieldErrors<any>` | `undefined`

### Usage

```tsx
import { useForm } from 'react-hook-form'

import { ControlledField } from '@baca/components'

const MyComponent: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
  })

  return (
    <ControlledField.CheckboxGroup
      control={control}
      errors={errors}
      label="Confirm"
      mb={4}
      name="confirm"
      testID="confirmCheckbox"
    />
  )
}

export default MyComponent
```
