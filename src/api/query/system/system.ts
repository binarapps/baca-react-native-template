/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * API
 * API documentation for the starter-kit project in NestJS by BinarApps. The API allows management of users, sessions and offers various functions for logged in users. Contains examples of authentication, authorization, and CRUD for selected resources.
 * OpenAPI spec version: 1.0
 */
import { useMutation } from '@tanstack/react-query'
import type { MutationFunction, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

import { customInstance } from '../../axios/custom-instance'
import type { ErrorType, BodyType } from '../../axios/custom-instance'
import type {
  AppVersionStatusEntity,
  CheckUpdateDto,
  ErrorServerEntity,
  ErrorTooManyRequestsEntity,
  ErrorValidationEntity,
} from '../../types'

type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1]

export const systemControllerCheckForAppUpdate = (
  checkUpdateDto: BodyType<CheckUpdateDto>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<AppVersionStatusEntity>(
    {
      url: `/api/v1/system/app-updates/check`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: checkUpdateDto,
    },
    options
  )
}

export const getSystemControllerCheckForAppUpdateMutationOptions = <
  TError = ErrorType<void | ErrorValidationEntity | ErrorTooManyRequestsEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>,
    TError,
    { data: BodyType<CheckUpdateDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationOptions<
  Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>,
  TError,
  { data: BodyType<CheckUpdateDto> },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {}

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>,
    { data: BodyType<CheckUpdateDto> }
  > = (props) => {
    const { data } = props ?? {}

    return systemControllerCheckForAppUpdate(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SystemControllerCheckForAppUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>
>
export type SystemControllerCheckForAppUpdateMutationBody = BodyType<CheckUpdateDto>
export type SystemControllerCheckForAppUpdateMutationError = ErrorType<
  void | ErrorValidationEntity | ErrorTooManyRequestsEntity | ErrorServerEntity
>

export const useSystemControllerCheckForAppUpdate = <
  TError = ErrorType<void | ErrorValidationEntity | ErrorTooManyRequestsEntity | ErrorServerEntity>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>,
    TError,
    { data: BodyType<CheckUpdateDto> },
    TContext
  >
  request?: SecondParameter<typeof customInstance>
}): UseMutationResult<
  Awaited<ReturnType<typeof systemControllerCheckForAppUpdate>>,
  TError,
  { data: BodyType<CheckUpdateDto> },
  TContext
> => {
  const mutationOptions = getSystemControllerCheckForAppUpdateMutationOptions(options)

  return useMutation(mutationOptions)
}
