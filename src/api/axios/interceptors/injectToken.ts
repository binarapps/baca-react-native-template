import { InternalAxiosRequestConfig } from 'axios'

import { getToken } from '@/services'

export const injectTokenToRequest = async (
  config: InternalAxiosRequestConfig<object>
): Promise<InternalAxiosRequestConfig<object>> => {
  const token = await getToken()

  if (token?.accessToken) {
    config.headers['Authorization'] = `Bearer ${token.accessToken}`
  }

  return config
}
