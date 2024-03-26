// custom-instance.ts

import { ENV, SECOND_IN_MS } from '@baca/constants'
import { getApiError, showErrorToast } from '@baca/utils'
import Axios, { AxiosError, AxiosRequestConfig } from 'axios'
import i18n from 'i18next'
import qs from 'qs'

import { injectTokenToRequest } from './interceptors'

type ApiErrorType = {
  error: string
  message: string
  statusCode: number

  errors: never
  status: never
}

type FormErrorType = {
  errors?: {
    [key: string]: string[]
  }
  status: number

  error: never
  message: never
  statusCode: never
}

export type ApiError = ApiErrorType | FormErrorType

export const baseURL = ENV.API_URL

export const AXIOS_INSTANCE = Axios.create({
  baseURL,
  timeout: 30 * SECOND_IN_MS,
  paramsSerializer: (params) => qs.stringify(params),
})

AXIOS_INSTANCE.interceptors.request.use(injectTokenToRequest, (error) => {
  console.log('Error while sending request', JSON.stringify(error, null, 2))
  return Promise.reject(error)
})

AXIOS_INSTANCE.interceptors.response.use(
  async (response) => {
    // CONFIG: Verify what response is your backend returning
    // Sometimes it's response.data.data
    return response
  },
  async (error: AxiosError<ApiError>) => {
    console.log('ERRRRRR DUPA ERRR', error)
    // handle FormErrorType
    const formErrors = error?.response?.data?.errors

    if (formErrors) {
      throw formErrors
    }

    // handle ApiErrorType
    const errorMessage = error?.response?.data?.message

    if (error.response?.status === 429) {
      showErrorToast({ description: i18n.t('errors.to_may_requests') })
      return
    }

    // TODO: we should handle certain error type
    if (errorMessage) {
      showErrorToast({ description: errorMessage })
      //CONFIG: Add errors in getApiError
      const api_error = getApiError(errorMessage)

      if (api_error) {
        return Promise.reject(new Error(api_error?.translation))
      }

      //FIXME: Delete this before deploy, this is unhandled error from backend
      return Promise.reject(new Error('BE: ' + errorMessage))
    }

    return Promise.reject(new Error(i18n.t('errors.something_went_wrong')))
  }
)

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error: ??
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>

export type BodyType<BodyData> = BodyData
