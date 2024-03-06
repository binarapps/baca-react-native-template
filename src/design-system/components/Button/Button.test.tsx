import { theme } from '@baca/constants'
import { cleanup, render, fireEvent, act } from '@baca/utils/testUtils'
import { StyleSheet } from 'react-native'

import { Button } from './Button'

afterEach(cleanup)
describe('Button', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Button title="Button" />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders correctly Button.Primary', () => {
    const { getByTestId } = render(<Button.Primary title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.primary.bg,
      borderColor: 'transparent',
      borderRadius: 4,
      borderWidth: undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      minWidth: 128,
      paddingHorizontal: 24,
      paddingVertical: 8,
    })
  })

  it('renders correctly Button.Secondary', () => {
    const { getByTestId } = render(<Button.Secondary title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.secondary.bg,
      borderColor: 'transparent',
      borderRadius: 4,
      borderWidth: undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      minWidth: 128,
      paddingHorizontal: 24,
      paddingVertical: 8,
    })
  })

  it('renders correctly Button.Outline', () => {
    const { getByTestId } = render(<Button.Outline title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.tertiary.fg,
      borderColor: theme.light.colors.border.primary,
      borderRadius: 4,
      borderWidth: StyleSheet.hairlineWidth,
      flexDirection: 'row',
      justifyContent: 'center',
      minWidth: 128,
      paddingHorizontal: 24,
      paddingVertical: 8,
    })
  })

  it('renders correctly Button.Ghost', () => {
    const { getByTestId } = render(<Button.Ghost title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.tertiary.fg,
      borderColor: 'transparent',
      borderRadius: 4,
      borderWidth: undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      minWidth: 128,
      paddingHorizontal: 24,
      paddingVertical: 8,
    })
  })

  it('renders correctly Button.Link', () => {
    const { getByTestId } = render(<Button.Link title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.tertiary.fg,
      borderColor: 'transparent',
      borderRadius: 4,
      borderWidth: undefined,
      flexDirection: 'row',
      justifyContent: 'center',
      minWidth: 128,
      paddingHorizontal: 24,
      paddingVertical: 8,
    })
  })

  it('should call onPress', async () => {
    const onPress = jest.fn()
    const { getByTestId, update } = render(<Button title="Button" onPress={onPress} />)
    const button = getByTestId('baseButton')
    fireEvent.press(button)
    await act(async () => {
      update(<Button />)
    })
    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it('should not call onPress when disabled', async () => {
    const onPress = jest.fn()
    const { getByTestId, update } = render(<Button title="Button" disabled onPress={onPress} />)
    const button = getByTestId('baseButton')
    fireEvent.press(button)
    await act(async () => {
      update(<Button />)
    })
    expect(onPress).toHaveBeenCalledTimes(0)
  })
})
