import { handleFormError } from './handleFormErrors'

console.error = () => {}

describe('handleFormError', () => {
  it('should call the callback function for each error field', () => {
    const error = {
      username: 'Username is required',
      password: 'Password is required',
    }

    const callback = jest.fn()

    handleFormError(error, callback)

    expect(callback).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledWith({
      field: 'username',
      description: 'Username is required',
    })
    expect(callback).toHaveBeenCalledWith({
      field: 'password',
      description: 'Password is required',
    })
  })

  it('should call the callback function with the correct field and description', () => {
    const error = {
      email: 'Email is invalid',
    }

    const callback = jest.fn()

    handleFormError(error, callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ field: 'email', description: 'Email is invalid' })
  })

  it('should handle a single string error', () => {
    const error = 'Internal server error'

    const callback = jest.fn()

    handleFormError(error, callback)

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith({ field: '', description: 'Internal server error' })
  })

  it('should not call the callback function if the error is empty', () => {
    const error = {}

    const callback = jest.fn()

    handleFormError(error, callback)

    expect(callback).not.toHaveBeenCalled()
  })
})
