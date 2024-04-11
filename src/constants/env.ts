import Constants from 'expo-constants'

export const ENV = {
  API_URL: Constants?.expoConfig?.extra?.API_URL,
  ENVIRONMENT_NAME: Constants?.expoConfig?.extra?.ENVIRONMENT_NAME,
  EAS_PROJECT_ID: Constants.expoConfig?.extra?.eas?.projectId,
}
