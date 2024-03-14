import i18n from '../i18n'

//CONFIG: This are examples errors, change it
export const API_ERRORS = [
  { errorMessage: 'invalidPassword', translation: i18n.t('errors.invalid_password') },
  { errorMessage: 'ERROR.INCORRECT.EMAIL', translation: i18n.t('errors.invalid_email') },
  { errorMessage: 'Token invalid', translation: i18n.t('errors.token_expired') },
  { errorMessage: 'Missing authentication', translation: i18n.t('errors.missing_auth') },
]
export const getApiError = (errorMessage: string) => {
  const api_error = API_ERRORS.find((el) => el.errorMessage === errorMessage)
  return api_error
}
