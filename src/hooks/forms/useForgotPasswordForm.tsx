import { useAuthControllerForgotPassword } from '@baca/api/query/auth/auth'
import { AuthForgotPasswordDto } from '@baca/api/types'
import { handleFormError, hapticImpact } from '@baca/utils'
import { router } from 'expo-router'
import { useForm } from 'react-hook-form'

const defaultValues: AuthForgotPasswordDto = {
  email: '',
}

export const useForgotPasswordForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { mutate: forgotPasswordMutate, isLoading: isSubmitting } =
    useAuthControllerForgotPassword()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError: setFormError,
  } = useForm<AuthForgotPasswordDto>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: AuthForgotPasswordDto) => {
    forgotPasswordMutate(
      { data },
      {
        onSuccess: (_, { data: { email } }) => {
          if (onSuccess) onSuccess()
          else router.replace(`/reset-password-link-sent?email=${encodeURIComponent(email)}`)
        },
        onError: (e) => {
          handleFormError<keyof AuthForgotPasswordDto>(
            e as unknown as keyof AuthForgotPasswordDto,
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
