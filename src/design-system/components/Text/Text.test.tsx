import { theme } from '@baca/design-system'
import { cleanup, render } from '@baca/utils/testUtils'

import { Display, Text } from './Text'

afterEach(cleanup)

console.error = jest.fn()
console.warn = jest.fn()

const defaultTextStyles = {
  color: theme.light.colors.text.brand.primary,
  fontFamily: 'Inter_Regular',
  fontSize: 16,
  fontWeight: '400',
  textTransform: 'none',
}

describe('Text', () => {
  it('renders correctly text', () => {
    const { getByText } = render(<Text>Hello World</Text>)
    expect(getByText('Hello World')).toBeDefined()
  })

  it('renders correctly with underline', () => {
    const { getByText } = render(<Text underline>Hello World</Text>)

    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textDecorationLine: 'underline',
    })
  })

  it('renders correctly with bold text', () => {
    const { getByText } = render(<Text bold>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontWeight: 'bold',
    })
  })

  it('renders correctly with italic text', () => {
    const { getByText } = render(<Text italic>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontStyle: 'italic',
    })
  })

  it('renders correctly with capitalized text', () => {
    const { getByText } = render(<Text capitalize>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textTransform: 'capitalize',
    })
  })

  it('renders correctly with uppercase text', () => {
    const { getByText } = render(<Text uppercase>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textTransform: 'uppercase',
    })
  })

  it('renders correctly with lowercase text', () => {
    const { getByText } = render(<Text lowercase>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textTransform: 'lowercase',
    })
  })

  it('renders correctly with a custom font size', () => {
    const { getByText } = render(<Text fontSize={20}>Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontSize: 20,
      textTransform: 'none',
    })
  })

  it('renders correctly with a custom color', () => {
    const { getByText } = render(<Text color="text.error.primary">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      color: theme.light.colors.text.error.primary,
      textTransform: 'none',
    })
  })

  it('renders correctly with a custom text alignment', () => {
    const { getByText } = render(<Text textAlign="center">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textAlign: 'center',
    })
  })

  it('renders correctly with a custom text decoration', () => {
    const { getByText } = render(<Text textDecoration="line-through">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      textDecorationLine: 'line-through',
    })
  })

  it('renders correctly with a custom font weight', () => {
    const { getByText } = render(<Text fontWeight="bold">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontWeight: 'bold',
    })
  })

  it('renders correctly with multiple styles', () => {
    const { getByText } = render(
      <Text bold italic color="text.error.primary" textDecoration="underline">
        Hello World
      </Text>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontStyle: 'italic',
      fontWeight: 'bold',
      color: theme.light.colors.text.error.primary,
      textDecorationLine: 'underline',
    })
  })

  it('renders correctly with variant LgRegular (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="LgRegular">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 48,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Text.LgRegular', () => {
    const { getByText } = render(<Display.LgRegular>Hello World</Display.LgRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 48,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant LgBold (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="LgBold">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 48,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Display.LgBold', () => {
    const { getByText } = render(<Display.LgBold>Hello World</Display.LgBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 48,
      fontWeight: '700',
    })
  })

  it('renders correctly with variant H2', () => {
    const { getByText } = render(
      <Display type="display" variant="MdRegular">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 36,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Display.H2', () => {
    const { getByText } = render(<Display.MdRegular>Hello World</Display.MdRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 36,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant MdBold (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="MdBold">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 36,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Display.MdBold', () => {
    const { getByText } = render(<Display.MdBold>Hello World</Display.MdBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 36,
      fontWeight: '700',
    })
  })

  it('renders correctly with variant SmRegular (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="SmRegular">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 30,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Display.SmRegular', () => {
    const { getByText } = render(<Display.SmRegular>Hello World</Display.SmRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 30,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant SmBold (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="SmBold">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 30,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Display.SmBold', () => {
    const { getByText } = render(<Display.SmBold>Hello World</Display.SmBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 30,
      fontWeight: '700',
    })
  })

  it('renders correctly with variant XsRegular (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="XsRegular">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 24,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Display.XsRegular', () => {
    const { getByText } = render(<Display.XsRegular>Hello World</Display.XsRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 24,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant XsBold (Display)', () => {
    const { getByText } = render(
      <Display type="display" variant="XsBold">
        Hello World
      </Display>
    )
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 24,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Display.XsBold', () => {
    const { getByText } = render(<Display.XsBold>Hello World</Display.XsBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 24,
      fontWeight: '700',
    })
  })

  it('renders correctly with variant XlRegular', () => {
    const { getByText } = render(<Text variant="XlRegular">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 20,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Text.XlRegular', () => {
    const { getByText } = render(<Text.XlRegular>Hello World</Text.XlRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 20,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant XlBold', () => {
    const { getByText } = render(<Text variant="XlBold">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 20,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Text.XlBold', () => {
    const { getByText } = render(<Text.XlBold>Hello World</Text.XlBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 20,
      fontWeight: '700',
    })
  })

  it('renders correctly with variant LgRegular', () => {
    const { getByText } = render(<Text variant="LgRegular">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 18,
      fontWeight: '400',
    })
  })

  it('renders correctly compound Text.LgRegular', () => {
    const { getByText } = render(<Text.LgRegular>Hello World</Text.LgRegular>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Regular',
      fontSize: 18,
      fontWeight: '400',
    })
  })

  it('renders correctly with variant LgBold', () => {
    const { getByText } = render(<Text variant="LgBold">Hello World</Text>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 18,
      fontWeight: '700',
    })
  })

  it('renders correctly compound Text.LgBold', async () => {
    const { getByText } = render(<Text.LgBold>Hello World</Text.LgBold>)
    expect(getByText('Hello World').props.style).toStrictEqual({
      ...defaultTextStyles,
      fontFamily: 'Inter_Bold',
      fontSize: 18,
      fontWeight: '700',
    })
  })
})
