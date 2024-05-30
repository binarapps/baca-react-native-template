import { AuthUpdateDto } from '@baca/api/types'
import { Box, Button, Row } from '@baca/design-system'
import { useUpdatePasswordForm } from '@baca/hooks/forms/useUpdatePasswordForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ProfileControlledInput } from './ProfileControlledInput'

interface ProfilePasswordFormProps {
  onSubmit: (data: AuthUpdateDto) => void
}

export const ProfilePasswordForm = ({ onSubmit }: ProfilePasswordFormProps) => {
  const { t } = useTranslation()
  const { control, errors, submit, isSubmitting } = useUpdatePasswordForm()

  return (
    <Box>
      <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
        <ProfileControlledInput
          label={t('form.labels.old_password')}
          name="oldPassword"
          placeholder={t('form.placeholders.old_password')}
          control={control}
          errors={errors}
          // secureTextEntry
        />
        <ProfileControlledInput
          label={t('form.labels.new_password')}
          name="password"
          placeholder={t('form.placeholders.new_password')}
          control={control}
          errors={errors}
          // secureTextEntry
        />
        <Row maxW={800} justifyContent="flex-end">
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={submit}
            testID="changePasswordButton"
          >
            {t('common.change')}
          </Button>
        </Row>
      </Box>
    </Box>
  )
}

// import { Box, Button } from '@baca/design-system'
// import { useTranslation } from '@baca/hooks'
// import { useUpdatePasswordForm } from '@baca/hooks/forms/useUpdatePasswordForm'
// import { ProfileControlledInput } from './ProfileControlledInput'
// import { AuthUpdateDto } from '@baca/api/types'

// interface ProfilePasswordFormProps {
//   onSubmit: (data: AuthUpdateDto) => void
// }

// export const ProfilePasswordForm = ({ onSubmit }: ProfilePasswordFormProps) => {
//   const { t } = useTranslation()
//   const { control, errors, isSubmitting, submit } = useUpdatePasswordForm()

//   return (
//     <Box
//       /* as="form" onSubmit={submit}  */ borderColor="border.secondary"
//       borderTopWidth={1}
//       py={6}
//     >
//       <ProfileControlledInput
//         label={t('form.labels.old_password')}
//         name="oldPassword"
//         placeholder={t('form.placeholders.old_password')}
//         control={control}
//         errors={errors}
//         // isPassword
//       />
//       <ProfileControlledInput
//         label={t('form.labels.new_password')}
//         name="password"
//         placeholder={t('form.placeholders.new_password')}
//         control={control}
//         errors={errors}
//         // isPassword
//       />
//       <Button type="submit" isLoading={isSubmitting}>
//         {t('common.change')}
//       </Button>
//     </Box>
//   )
// }

// import { Box, Spacer, Button } from '@baca/design-system'
// import { useForm, Controller } from 'react-hook-form'
// import { ProfileControlledInput } from './ProfileControlledInput'
// import { useTranslation } from '@baca/hooks'
// import { AuthUpdateDto } from '@baca/api/types'

// interface ProfilePasswordFormProps {
//   onSubmit: (data: AuthUpdateDto) => void
// }

// export const ProfilePasswordForm = ({ onSubmit }: ProfilePasswordFormProps) => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<AuthUpdateDto>()
//   const { t } = useTranslation()

//   return (
//     <Box as="form" onSubmit={handleSubmit(onSubmit)}>
//       <ProfileControlledInput
//         label={t('form.labels.old_password')}
//         name="oldPassword"
//         placeholder={t('form.placeholders.old_password')}
//         control={control}
//         errors={errors}
//         isPassword
//       />
//       <Spacer y={4} />
//       <ProfileControlledInput
//         label={t('form.labels.new_password')}
//         name="password"
//         placeholder={t('form.placeholders.new_password')}
//         control={control}
//         errors={errors}
//         isPassword
//       />
//       <Spacer y={4} />
//       <Button type="submit">{t('form.buttons.update_password')}</Button>
//     </Box>
//   )
// }
