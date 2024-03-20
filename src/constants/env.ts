import Constants from 'expo-constants'

export const ENV = {
  API_URL: Constants?.expoConfig?.extra?.API_URL,
  ENVIRONMENT: Constants?.expoConfig?.extra?.ENVIRONMENT,
  EAS_PROJECT_ID: 'ac562c27-4a4e-4532-869f-fe6f9447bee6', // FIXME: Move it to .env
}
