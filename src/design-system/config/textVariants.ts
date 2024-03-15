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
  LgSemibold: { fontWeight: 'Semibold', fontSize: 'lg' },
  MdBold: { fontWeight: 'Bold', fontSize: 'md' },
  MdMedium: { fontWeight: 'Medium', fontSize: 'md' },
  MdRegular: { fontWeight: 'Regular', fontSize: 'md' },
  MdSemibold: { fontWeight: 'Semibold', fontSize: 'md' },
  SmBold: { fontWeight: 'Bold', fontSize: 'sm' },
  SmMedium: { fontWeight: 'Medium', fontSize: 'sm' },
  SmRegular: { fontWeight: 'Regular', fontSize: 'sm' },
  SmSemibold: { fontWeight: 'Semibold', fontSize: 'sm' },
  XlBold: { fontWeight: 'Bold', fontSize: 'xl' },
  XlMedium: { fontWeight: 'Medium', fontSize: 'xl' },
  XlRegular: { fontWeight: 'Regular', fontSize: 'xl' },
  XlSemibold: { fontWeight: 'Semibold', fontSize: 'xl' },
  XsBold: { fontWeight: 'Bold', fontSize: 'xs' },
  XsMedium: { fontWeight: 'Medium', fontSize: 'xs' },
  XsRegular: { fontWeight: 'Regular', fontSize: 'xs' },
  XsSemibold: { fontWeight: 'Semibold', fontSize: 'xs' },
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
  LgSemibold: { fontWeight: 'Semibold', fontSize: 'lg' },
  MdBold: { fontWeight: 'Bold', fontSize: 'md' },
  MdMedium: { fontWeight: 'Medium', fontSize: 'md' },
  MdRegular: { fontWeight: 'Regular', fontSize: 'md' },
  MdSemibold: { fontWeight: 'Semibold', fontSize: 'md' },
  SmBold: { fontWeight: 'Bold', fontSize: 'sm' },
  SmMedium: { fontWeight: 'Medium', fontSize: 'sm' },
  SmRegular: { fontWeight: 'Regular', fontSize: 'sm' },
  SmSemibold: { fontWeight: 'Semibold', fontSize: 'sm' },
  XlBold: { fontWeight: 'Bold', fontSize: 'xl' },
  XlMedium: { fontWeight: 'Medium', fontSize: 'xl' },
  XlRegular: { fontWeight: 'Regular', fontSize: 'xl' },
  XlSemibold: { fontWeight: 'Semibold', fontSize: 'xl' },
  XsBold: { fontWeight: 'Bold', fontSize: 'xs' },
  XsMedium: { fontWeight: 'Medium', fontSize: 'xs' },
  XsRegular: { fontWeight: 'Regular', fontSize: 'xs' },
  XsSemibold: { fontWeight: 'Semibold', fontSize: 'xs' },
  XxlBold: { fontWeight: 'Bold', fontSize: 'xxl' },
  XxlMedium: { fontWeight: 'Medium', fontSize: 'xxl' },
  XxlRegular: { fontWeight: 'Regular', fontSize: 'xxl' },
  XxlSemibold: { fontWeight: 'Semibold', fontSize: 'xxl' },
}
