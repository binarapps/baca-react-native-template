import { useAuthControllerLogin } from '@baca/api/query/auth/auth'
import { AuthEmailLoginDto } from '@baca/api/types'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom } from '@baca/store/auth'
import { hapticImpact } from '@baca/utils'
import { handleFormError } from '@baca/utils/handleFormErrors'
import { useSetAtom } from 'jotai'
import { useForm } from 'react-hook-form'

type SignInFormValues = AuthEmailLoginDto & {
  confirm: boolean
}

const defaultValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  email: 'l.jeziorski+user@binarapps.com',
  password: 'Qwerty1!',
  confirm: false,
}

export const useSignInForm = () => {
  const setIsSignedIn = useSetAtom(isSignedInAtom)

  const { mutate: loginMutate, isLoading: isSubmitting } = useAuthControllerLogin<{
    message: string
  }>()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError: setFormError,
    setFocus,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignInFormValues) => {
    // Errors are handled on UI side
    // if you want to stop this function with error just throw new Error.
    // Remember to pass readable error message for user, because this error will be displayed for him
    loginMutate(
      { data },
      // FIXME: add proper notification handling, generate some global config
      {
        onError: (e) => {
          handleFormError<keyof AuthEmailLoginDto>(
            e as unknown as keyof AuthEmailLoginDto,
            ({ field, description }) => {
              setFormError(field, { message: description })
            }
          )

          hapticImpact()
        },
        onSuccess: async (response) => {
          await setToken(response.accessToken)
          setIsSignedIn(true)

          // Send push token to backend
          await assignPushToken()
        },
      }
    )
  }

  return {
    submit: handleSubmit(onSubmit),
    isSubmitting,
    control,
    errors,
    setFocus,
  }
}
