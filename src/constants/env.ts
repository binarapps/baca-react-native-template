import Constants from 'expo-constants'

export const ENV = {
  API_URL: Constants?.expoConfig?.extra?.API_URL,
  EAS_PROJECT_ID: Constants.expoConfig?.extra?.eas?.projectId,
  ENVIRONMENT_NAME: Constants?.expoConfig?.extra?.ENVIRONMENT_NAME,
  WEB_CLIENT_ID: Constants.expoConfig?.extra?.WEB_CLIENT_ID,
}
