import Constants from 'expo-constants'

export const ENV = {
  API_URL: 'https://api.binarapps.online/', // TODO: create env for dev/staging/prod and keep it there
  ENVIRONMENT: Constants?.expoConfig?.extra?.ENVIRONMENT,
}
