import { useAuthControllerRegister } from '@baca/api/query/auth/auth'
import { AuthRegisterLoginDto } from '@baca/api/types'
import { handleFormError, hapticImpact, showSuccessToast } from '@baca/utils'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const defaultValues: AuthRegisterLoginDto = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  // FIXME: hardcoded locale
  locale: 'en-US',
  termsAccepted: false,
  privacyPolicyAccepted: false,
}

export const useSignUpForm = () => {
  const { mutate: signUpMutation, isLoading } = useAuthControllerRegister()
  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError: setFormError,
    setFocus,
  } = useForm<AuthRegisterLoginDto>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = (data: AuthRegisterLoginDto) => {
    signUpMutation(
      {
        data,
      },
      {
        onSuccess: () => {
          showSuccessToast({
            description: t('toast.success.new_account_created', { userEmail: data.email }),
          })
        },
        onError: (e) => {
          handleFormError<keyof AuthRegisterLoginDto>(
            e as unknown as keyof AuthRegisterLoginDto,
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
    isSubmitting: isLoading,
    register: handleSubmit(onSubmit),
    setFocus,
  }
}
