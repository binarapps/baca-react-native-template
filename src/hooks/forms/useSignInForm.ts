import { useSetAtom } from 'jotai'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthControllerLogin } from '@/api/query/auth/auth'
import { AuthEmailLoginDto } from '@/api/types'
import { assignPushToken, setToken } from '@/services'
import { isSignedInAtom } from '@/store/auth'
import { handleFormError, hapticImpact } from '@/utils'

type SignInFormValues = AuthEmailLoginDto & {
  confirm: boolean
}

type UseSignInFormProps = {
  setIsSignInButtonsDisabled?: Dispatch<SetStateAction<boolean>>
}

const filledFormValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  email: 'mateusz.rostkowski+baca@binarapps.com',
  password: 'Test1234,',
  confirm: false,
}

const defaultValues: SignInFormValues = {
  email: '',
  password: '',
  confirm: false,
}

export const useSignInForm = ({ setIsSignInButtonsDisabled }: UseSignInFormProps) => {
  const setIsSignedIn = useSetAtom(isSignedInAtom)

  const { mutate: loginMutate, isPending: isSubmitting } = useAuthControllerLogin()

  const {
    control,
    formState: { errors },
    getValues,
    reset,
    handleSubmit,
    setError: setFormError,
    setFocus,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const resetFormToFilledValues = () => {
    reset(filledFormValues)
  }

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
    resetFormToFilledValues,
    submit: handleSubmit(onSubmit),
  }
}
