import { useAuthControllerUpdate, useAuthControllerMe } from '@baca/api/query/auth/auth'
import { AuthUpdateDto } from '@baca/api/types'
// import { AuthUpdateDto } from '@baca/types/profileForm'
import { hapticImpact } from '@baca/utils'
import { handleFormError } from '@baca/utils/handleFormErrors'
import { useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const useUpdateProfileForm = () => {
  const { data: userData } = useAuthControllerMe()
  const { mutate: userUpdate, isLoading: isSubmitting } = useAuthControllerUpdate()

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
    setFocus,
    reset,
    handleSubmit,
    setError: setFormError,
  } = useForm<AuthUpdateDto>({
    mode: 'onTouched',
    defaultValues,
  })

  useEffect(() => reset(defaultValues), [reset, defaultValues])

  const onSubmit = async (data: AuthUpdateDto) => {
    userUpdate(
      { data },
      {
        onError: (e) => {
          handleFormError<keyof AuthUpdateDto>(
            e as unknown as keyof AuthUpdateDto,
            ({ field, description }) => {
              setFormError(field as keyof AuthUpdateDto, { message: description })
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
    setFocus,
    submit: handleSubmit(onSubmit),
  }
}
