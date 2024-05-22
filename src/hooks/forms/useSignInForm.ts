import { useAuthControllerLogin } from '@baca/api/query/auth/auth'
import { AuthEmailLoginDto } from '@baca/api/types'
import { assignPushToken, setToken } from '@baca/services'
import { isSignedInAtom } from '@baca/store/auth'
import { handleFormError, hapticImpact } from '@baca/utils'
import { useSetAtom } from 'jotai'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

type SignInFormValues = AuthEmailLoginDto & {
  confirm: boolean
}

type UseSignInFormProps = {
  setIsSignInButtonsDisabled?: Dispatch<SetStateAction<boolean>>
}

const defaultValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  email: 'mateusz.rostkowski+baca@binarapps.com',
  password: 'Test1234,',
  confirm: false,
}

export const useSignInForm = ({ setIsSignInButtonsDisabled }: UseSignInFormProps) => {
  const setIsSignedIn = useSetAtom(isSignedInAtom)

  const { mutate: loginMutate, isLoading: isSubmitting } = useAuthControllerLogin<{
    message: string
  }>()

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setError: setFormError,
    setFocus,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignInFormValues) => {
    setIsSignInButtonsDisabled?.(true)
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
          const { user, ...token } = response
          if (token) {
            await setToken(token)
          }

          setIsSignedIn(true)

          // Send push token to backend
          await assignPushToken()
        },
      }
    )
    setIsSignInButtonsDisabled?.(false)
  }

  return {
    control,
    errors,
    getValues,
    isSubmitting,
    setFocus,
    submit: handleSubmit(onSubmit),
  }
}
