type BackendErrorResponseType<TField extends string> =
  | {
      [key in TField]: string
    }
  | string

type CallbackArgType<TField> = {
  field: TField
  description: string
}

type CallbackType<TField> = (arg: CallbackArgType<TField>) => void

export const handleFormError = <TField extends string>(
  e: BackendErrorResponseType<TField>,
  callback: CallbackType<TField>
) => {
  Object.entries(e).forEach(([key, value]) => {
    callback({ field: key as TField, description: value as string })
  })
}
