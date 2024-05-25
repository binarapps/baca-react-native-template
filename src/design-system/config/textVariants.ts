import { FontWeight, fontDisplaySize, fontTextSize } from './theme'

export type TextVariant =
  | 'LgBold'
  | 'LgMedium'
  | 'LgRegular'
  | 'LgSemibold'
  | 'MdBold'
  | 'MdMedium'
  | 'MdRegular'
  | 'MdSemibold'
  | 'SmBold'
  | 'SmMedium'
  | 'SmRegular'
  | 'SmSemibold'
  | 'XlBold'
  | 'XlMedium'
  | 'XlRegular'
  | 'XlSemibold'
  | 'XsBold'
  | 'XsMedium'
  | 'XsRegular'
  | 'XsSemibold'

export const textVariants: {
  [key in TextVariant]: { fontWeight: FontWeight; fontSize: keyof typeof fontTextSize }
} = {
  LgBold: { fontWeight: 'Bold', fontSize: 'lg' },
  LgMedium: { fontWeight: 'Medium', fontSize: 'lg' },
  LgRegular: { fontWeight: 'Regular', fontSize: 'lg' },
  // FIXME: Investigate why Semibold is crashing
  // Semibold is crashing for some reason
  // https://github.com/expo/expo/issues/29030
  LgSemibold: { fontWeight: 'Bold', fontSize: 'lg' },
  MdBold: { fontWeight: 'Bold', fontSize: 'md' },
  MdMedium: { fontWeight: 'Medium', fontSize: 'md' },
  MdRegular: { fontWeight: 'Regular', fontSize: 'md' },
  // FIXME: Investigate why Semibold is crashing
  MdSemibold: { fontWeight: 'Bold', fontSize: 'md' },
  SmBold: { fontWeight: 'Bold', fontSize: 'sm' },
  SmMedium: { fontWeight: 'Medium', fontSize: 'sm' },
  SmRegular: { fontWeight: 'Regular', fontSize: 'sm' },
  // FIXME: Investigate why Semibold is crashing
  SmSemibold: { fontWeight: 'Bold', fontSize: 'sm' },
  XlBold: { fontWeight: 'Bold', fontSize: 'xl' },
  XlMedium: { fontWeight: 'Medium', fontSize: 'xl' },
  XlRegular: { fontWeight: 'Regular', fontSize: 'xl' },
  // FIXME: Investigate why Semibold is crashing
  XlSemibold: { fontWeight: 'Bold', fontSize: 'xl' },
  XsBold: { fontWeight: 'Bold', fontSize: 'xs' },
  XsMedium: { fontWeight: 'Medium', fontSize: 'xs' },
  XsRegular: { fontWeight: 'Regular', fontSize: 'xs' },
  // FIXME: Investigate why Semibold is crashing
  XsSemibold: { fontWeight: 'Bold', fontSize: 'xs' },
}

export type DisplayVariant =
  | 'LgBold'
  | 'LgMedium'
  | 'LgRegular'
  | 'LgSemibold'
  | 'MdBold'
  | 'MdMedium'
  | 'MdRegular'
  | 'MdSemibold'
  | 'SmBold'
  | 'SmMedium'
  | 'SmRegular'
  | 'SmSemibold'
  | 'XlBold'
  | 'XlMedium'
  | 'XlRegular'
  | 'XlSemibold'
  | 'XsBold'
  | 'XsMedium'
  | 'XsRegular'
  | 'XsSemibold'
  | 'XxlBold'
  | 'XxlMedium'
  | 'XxlRegular'
  | 'XxlSemibold'

export const displayVariants: {
  [key in DisplayVariant]: { fontWeight: FontWeight; fontSize: keyof typeof fontDisplaySize }
} = {
  LgBold: { fontWeight: 'Bold', fontSize: 'lg' },
  LgMedium: { fontWeight: 'Medium', fontSize: 'lg' },
  LgRegular: { fontWeight: 'Regular', fontSize: 'lg' },
  // FIXME: Investigate why Semibold is crashing
  // Semibold is crashing for some reason
  // https://github.com/expo/expo/issues/29030
  LgSemibold: { fontWeight: 'Bold', fontSize: 'lg' },
  MdBold: { fontWeight: 'Bold', fontSize: 'md' },
  MdMedium: { fontWeight: 'Medium', fontSize: 'md' },
  MdRegular: { fontWeight: 'Regular', fontSize: 'md' },
  // FIXME: Investigate why Semibold is crashing
  MdSemibold: { fontWeight: 'Bold', fontSize: 'md' },
  SmBold: { fontWeight: 'Bold', fontSize: 'sm' },
  SmMedium: { fontWeight: 'Medium', fontSize: 'sm' },
  SmRegular: { fontWeight: 'Regular', fontSize: 'sm' },
  // FIXME: Investigate why Semibold is crashing
  SmSemibold: { fontWeight: 'Bold', fontSize: 'sm' },
  XlBold: { fontWeight: 'Bold', fontSize: 'xl' },
  XlMedium: { fontWeight: 'Medium', fontSize: 'xl' },
  XlRegular: { fontWeight: 'Regular', fontSize: 'xl' },
  // FIXME: Investigate why Semibold is crashing
  XlSemibold: { fontWeight: 'Bold', fontSize: 'xl' },
  XsBold: { fontWeight: 'Bold', fontSize: 'xs' },
  XsMedium: { fontWeight: 'Medium', fontSize: 'xs' },
  XsRegular: { fontWeight: 'Regular', fontSize: 'xs' },
  // FIXME: Investigate why Semibold is crashing
  XsSemibold: { fontWeight: 'Bold', fontSize: 'xs' },
  XxlBold: { fontWeight: 'Bold', fontSize: 'xxl' },
  XxlMedium: { fontWeight: 'Medium', fontSize: 'xxl' },
  XxlRegular: { fontWeight: 'Regular', fontSize: 'xxl' },
  // FIXME: Investigate why Semibold is crashing
  XxlSemibold: { fontWeight: 'Bold', fontSize: 'xxl' },
}
