export const ASYNC_STORAGE_KEYS = {
  COLOR_SCHEME: '@theme/colorScheme',
  NAVIGATION_STATE: '@navigation/navigation-state',
  NEXT_DEEP_LINK: '@navigation/next_deeplink',
  PUSH_TOKEN: '@notification/push-token',
  USER_LANGUAGE: '@language/user-language',
  USER_REFRESH_TOKEN: 'user_token-refresh_token', // This value is used in `expo-secure-store` package and it can't include '@' and '/'
  USER_TOKEN: 'user_token-token', // This value is used in `expo-secure-store` package and it can't include '@' and '/'
  WAS_PUSH_TOKEN_SEND: '@notification/was-push-token-send',
} as const
