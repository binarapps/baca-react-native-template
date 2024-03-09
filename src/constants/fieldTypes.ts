export enum FieldTypes {
  //ProfileScreen
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export type Input = {
  inputMode: string
  isDisabled?: boolean
  label: string
  name: FieldTypes
  onFocuse?: () => void
  placeholder: string
  testID: string
  type?: string
}
