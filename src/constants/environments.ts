import Constants, { AppOwnership } from 'expo-constants'
import { Platform } from 'react-native'

import { ENV } from './env'

export const isExpoGo = Constants.appOwnership === AppOwnership.Expo
export const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development'
export const isProduction = !isDevelopment || process.env.NODE_ENV === 'production'
export const isMock = !!ENV.IS_MOCK

export const isWeb = Platform.OS === 'web'
