import { useAuthControllerUpdate, useAuthControllerMe } from '@baca/api/query/auth/auth'
import { AuthUpdateDto } from '@baca/api/types'
import { handleFormError, hapticImpact, showSuccessToast } from '@baca/utils'
import { useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
          showSuccessToast({ description: t('toast.success.profile_updated') })
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
