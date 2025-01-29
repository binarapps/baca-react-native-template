import Constants, { ExecutionEnvironment } from 'expo-constants'
import { Platform } from 'react-native'

import { ENV } from './env'

// It's true for Expo Go
// TODO: Verify if it's false on dev client
export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient
export const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development'
export const isProduction = !isDevelopment || process.env.NODE_ENV === 'production'
export const isMock = !!ENV.IS_MOCK

export const isWeb = Platform.OS === 'web'
