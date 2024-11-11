const layoutPropsKeys = [
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'my',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'py',
]

export const getLayoutProps = <T extends object>(props: T) => {
  const layoutProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => layoutPropsKeys.includes(key))
  )

  const restProps = Object.fromEntries(
    Object.entries(props).filter(([key]) => !layoutPropsKeys.includes(key))
  )

  return { layoutProps, restProps }
}
