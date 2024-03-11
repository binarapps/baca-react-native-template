import { useAuthControllerRegister } from '@baca/api/query/auth/auth'
import { AuthRegisterLoginDto } from '@baca/api/types'
import { hapticImpact } from '@baca/utils'
import { handleFormError } from '@baca/utils/handleFormErrors'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { notify } from 'react-native-notificated'

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
  const { mutateAsync: loginMutation, isLoading } = useAuthControllerRegister()
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

  const onSubmit = async (data: AuthRegisterLoginDto) => {
    await loginMutation(
      {
        data,
      },
      {
        onSuccess: () => {
          notify('success', {
            params: {
              style: { multiline: 100 },
              title: 'SUCCESS',
              description: t('sign_up_screen.created_new_account', { userEmail: data.email }),
            },
          })
        },
        onError: (e) => {
          handleFormError<keyof AuthRegisterLoginDto>(
            e as unknown as keyof AuthRegisterLoginDto,
            ({ field, description }) => {
              setFormError(field as keyof AuthRegisterLoginDto, { message: description })
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
