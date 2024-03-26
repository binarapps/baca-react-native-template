import { useAuthControllerResetPassword } from '@baca/api/query/auth/auth'
import { AuthResetPasswordDto } from '@baca/api/types'
import { handleFormError, hapticImpact } from '@baca/utils'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

type FormValuesType = AuthResetPasswordDto & { confirmPassword: string }

const defaultValues: FormValuesType = {
  confirmPassword: '',
  hash: '',
  password: '',
}

export const useResetPasswordForm = () => {
  const { mutate: resetPasswordMutate, isLoading: isSubmitting } = useAuthControllerResetPassword()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError: setFormError,
  } = useForm<FormValuesType>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async ({ confirmPassword, ...data }: FormValuesType) => {
    resetPasswordMutate(
      { data },
      {
        onSuccess: () => {
          router.replace(`/reset-password-complete`)
        },
        onError: (e) => {
          handleFormError<keyof AuthResetPasswordDto>(
            e as unknown as keyof AuthResetPasswordDto,
            ({ field, description }) => {
              setFormError(field, { message: description })
            }
          )

          hapticImpact()
        },
      }
    )
  }

  return {
    control,
    errors,
    isSubmitting,
    reset,
    submit: handleSubmit(onSubmit),
  }
}
