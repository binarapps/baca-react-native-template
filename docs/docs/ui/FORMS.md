---
id: forms
slug: /forms
title: Forms
sidebar_position: 5
tags:
  - Forms
  - Components
  - react-hook-form
  - Expo
  - React
  - React Native
description: Forms - check how to setup it from scratch
---

# How to Create Forms in the App

This guide provides a step-by-step approach to creating forms in the app using our design system and custom hooks. We utilize `react-hook-form` for form management, and our custom components ensure consistency and ease of use across the application.

## Overview

- **Form Management**: We use `react-hook-form` for handling form state, validation, and submission.
- **Custom Hooks**: The `useSignInForm` hook encapsulates form logic, including submission and error handling.
- **Controlled Components**: Our `ControlledField` components are connected to the form control for seamless integration.
- **Design System Components**: Utilize components from `@baca/design-system` and `@baca/components` for consistent styling.

## Steps to Create a Form

### 1. Set Up the Form Hook

Create a custom hook that manages the form logic using `react-hook-form`. Here's how you can structure it:

```tsx
import { useForm } from 'react-hook-form'

type FormValues = {
  email: string
  password: string
  rememberMe: boolean
}

export const useCustomForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    // Handle form submission
  }

  return {
    control,
    errors,
    setFocus,
    submit: handleSubmit(onSubmit),
  }
}
```

**Key Points:**

- **useForm Hook**: Initializes the form with default values and validation mode.
- **Control Object**: Passed to controlled components to register them with the form.
- **handleSubmit**: Wraps the `onSubmit` function to handle validation and submission.
- **Errors Object**: Contains validation errors for form fields.
- **setFocus**: Used to focus on a specific field programmatically.

### 2. Create the Form Component

In your screen or component file, use the custom hook and design system components to build the form UI.

```tsx
import { ControlledField, Button, Spacer } from '@baca/design-system'
import { useCustomForm } from './useCustomForm'

export const SignInForm = () => {
  const { control, errors, submit, setFocus } = useCustomForm()

  return (
    <FormWrapper>
      <ControlledField.Input
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        autoCapitalize="none"
        keyboardType="email-address"
        rules={{
          required: 'Email is required',
          pattern: {
            value: REGEX.EMAIL,
            message: 'Invalid email format',
          },
        }}
        onSubmitEditing={() => setFocus('password')}
        error={errors.email}
      />
      <ControlledField.Input
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        rules={{
          required: 'Password is required',
        }}
        onSubmitEditing={submit}
        error={errors.password}
      />
      <ControlledField.Checkbox control={control} name="rememberMe" label="Remember Me" />
      <Spacer y={4} />
      <Button onPress={submit}>Sign In</Button>
    </FormWrapper>
  )
}
```

**Key Points:**

- **ControlledField.Input**: Custom input component connected to the form control.
- **Validation Rules**: Define validation rules directly in the component.
- **Error Handling**: Pass error messages from `errors` object to display validation feedback.
- **Focus Management**: Use `setFocus` to navigate between fields on form submission.

### 3. Handle Form Submission

In the custom hook, handle form submission using mutation hooks or any API calling method.

```tsx
import { useMutation } from '@tanstack/react-query'

export const useCustomForm = () => {
  // ... previous code

  const mutation = useMutation((data: FormValues) => {
    // API call to submit form data
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await mutation.mutateAsync(data)
      // Handle success (e.g., navigate to another screen)
    } catch (error) {
      // Handle errors (e.g., set form errors)
    }
  }

  // ... return statement
}
```

**Key Points:**

- **useMutation**: Handles asynchronous API calls.
- **Error Handling**: Use `try...catch` blocks to handle submission errors.
- **Feedback**: Provide user feedback on success or error (e.g., using toasts or navigation).

### 4. Integrate Validation and Error Handling

Leverage `react-hook-form`'s validation capabilities and our utilities for error handling.

```tsx
// In the onError callback
onError: (error) => {
  handleFormError(error, ({ field, message }) => {
    setFormError(field, { message })
  })
  // Provide haptic feedback or notifications
}
```

**Key Points:**

- **handleFormError**: Utility function to map API errors to form fields.
- **setFormError**: Sets validation errors on specific fields.
- **User Feedback**: Use haptic feedback or visual cues to inform the user of errors.

### 5. Utilize Design System Components

Ensure that all form elements use components from our design system for consistency.

- **Inputs**: Use `ControlledField.Input` for text inputs.
- **Checkboxes**: Use `ControlledField.Checkbox` for boolean inputs.
- **Buttons**: Use `Button` components for actions.
- **Layout**: Use `Box`, `Row`, `Spacer`, and other layout components for alignment and spacing.

### 6. Example Form Implementation

Here's an example of a complete form implementation:

```tsx
import { ControlledField, Button, Spacer, Box } from '@baca/design-system'
import { useCustomForm } from './useCustomForm'

export const ExampleForm = () => {
  const { control, errors, submit, isSubmitting } = useCustomForm()

  return (
    <Box padding={4}>
      <ControlledField.Input
        control={control}
        name="email"
        label="Email"
        placeholder="Email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: REGEX.EMAIL,
            message: 'Enter a valid email address',
          },
        }}
        error={errors.email}
      />
      <Spacer y={2} />
      <ControlledField.Input
        control={control}
        name="password"
        label="Password"
        placeholder="Password"
        secureTextEntry
        rules={{ required: 'Password is required' }}
        error={errors.password}
      />
      <Spacer y={2} />
      <ControlledField.Checkbox control={control} name="rememberMe" label="Remember Me" />
      <Spacer y={4} />
      <Button onPress={submit} loading={isSubmitting} disabled={isSubmitting}>
        Submit
      </Button>
    </Box>
  )
}
```

## Best Practices

- **Validation Messages**: Provide clear and user-friendly validation messages.
- **Async Operations**: Indicate loading states on buttons during form submission.
- **Error Feedback**: Display validation errors near the corresponding fields.
- **Accessibility**: Ensure fields are focusable and navigable via keyboard.

## Utilities and Services

- **handleFormError**: Utility to map API errors to form fields.
- **hapticImpact**: Provides haptic feedback on certain actions.
- **assignPushToken**: Assigns a push notification token after successful login.

## Conclusion

By following this guide, you can create forms that are consistent with the app's design system and provide a seamless user experience. Utilizing `react-hook-form` along with our custom components and hooks simplifies form management and enhances code maintainability.

---

**Note**: Replace placeholders and adjust imports based on your actual file structure and available utilities.
