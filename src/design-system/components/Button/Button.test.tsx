import { Button } from './Button'

import { theme } from '@/design-system'
import { cleanup, render, fireEvent, act } from '@/utils/testUtils'

const baseStyles = {
  alignItems: 'center',
  borderRadius: 4,
  flexDirection: 'row',
  justifyContent: 'center',
  paddingHorizontal: 14,
  paddingVertical: 10,
}

afterEach(cleanup)
describe('Button', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Button title="Button" />)
    expect(toJSON()).toMatchSnapshot()
  })

  it('renders correctly Button.Primary', () => {
    const { getByTestId } = render(<Button.Primary title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.button.primary.bg,
      borderColor: theme.light.colors.button.primary.border,
      borderWidth: 1,
    })
  })

  it('renders correctly Button.PrimaryDestructive', () => {
    const { getByTestId } = render(<Button.PrimaryDestructive title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.button.primary.error.bg,
      borderColor: theme.light.colors.button.primary.error.border,
      borderWidth: 1,
    })
  })

  it('renders correctly Button.SecondaryColor', () => {
    const { getByTestId } = render(<Button.SecondaryColor title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.button.secondary.color.bg,
      borderColor: theme.light.colors.button.secondary.color.border,
      borderWidth: 1,
    })
  })

  it('renders correctly Button.SecondaryGray', () => {
    const { getByTestId } = render(<Button.SecondaryGray title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      alignItems: 'center',
      backgroundColor: theme.light.colors.button.secondary.bg,
      borderColor: theme.light.colors.button.secondary.border,
      borderWidth: 1,
    })
  })

  it('renders correctly Button.SecondaryDestructive', () => {
    const { getByTestId } = render(<Button.SecondaryDestructive title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.button.secondary.error.bg,
      borderColor: theme.light.colors.button.secondary.error.border,
      borderWidth: 1,
    })
  })

  it('renders correctly Button.TertiaryColor', () => {
    const { getByTestId } = render(<Button.TertiaryColor title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
    })
  })

  it('renders correctly Button.TertiaryGray', () => {
    const { getByTestId } = render(<Button.TertiaryGray title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
    })
  })

  it('renders correctly Button.TertiaryDestructive', () => {
    const { getByTestId } = render(<Button.TertiaryDestructive title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
    })
  })

  it('renders correctly Button.LinkColor', () => {
    const { getByTestId } = render(<Button.LinkColor title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
    })
  })

  it('renders correctly Button.LinkGray', () => {
    const { getByTestId } = render(<Button.LinkGray title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
    })
  })

  it('renders correctly Button.LinkDestructive', () => {
    const { getByTestId } = render(<Button.LinkDestructive title="Button" />)
    expect(getByTestId('baseButton').props.style).toStrictEqual({
      ...baseStyles,
      backgroundColor: theme.light.colors.Base.transparent,
      borderColor: theme.light.colors.Base.transparent,
      borderWidth: undefined,
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
