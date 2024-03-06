import { getToken } from '@baca/services'
import { AxiosRequestConfig } from 'axios'

export const injectTokenToRequest = async (config: AxiosRequestConfig<object>) => {
  const token = await getToken()

  let Authorization = ''
  if (token) {
    Authorization = `Bearer ${token}`
  }
  return {
    ...config,
    headers: {
      ...config?.headers,
      Authorization,
    },
  }
}
