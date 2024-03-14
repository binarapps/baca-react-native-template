import { useAuthControllerUpdate, useAuthControllerMe } from '@baca/api/query/auth/auth'
import { AuthUpdateDto } from '@baca/api/types'
import { hapticImpact } from '@baca/utils'
import { handleFormError } from '@baca/utils/handleFormErrors'
import { useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { notify } from 'react-native-notificated'

export const useUpdateProfileForm = () => {
  const { data: userData } = useAuthControllerMe()
  const { t } = useTranslation()
  const { mutate: updateUserMutation, isLoading } = useAuthControllerUpdate()

  const defaultValues: AuthUpdateDto = useMemo(
    () => ({
      email: userData?.email || '',
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
    }),
    [userData]
  )

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setError: setFormError,
    setFocus,
  } = useForm<AuthUpdateDto>({
    mode: 'onTouched',
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  const onSubmit = (data: AuthUpdateDto) => {
    updateUserMutation(
      { data },
      {
        onSuccess: () => {
          notify('success', {
            params: {
              style: { multiline: 100 },
              title: 'SUCCESS',
              description: t('profile_screen.update_profile_success'),
            },
          })
        },
        onError: (e) => {
          handleFormError<keyof AuthUpdateDto>(
            e as unknown as keyof AuthUpdateDto,
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
    setFocus,
    submit: handleSubmit(onSubmit),
  }
}
