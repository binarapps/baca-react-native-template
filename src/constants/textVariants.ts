import { TextVariant } from '~components'

type VariantStyle = {
  fontFamily: Fonts
  fontSize: FontSizes
}

export const textVariants: { [key in TextVariant]: VariantStyle } = {
  H1: {
    fontFamily: 'regular',
    fontSize: '5xl',
  },
  H1Bold: {
    fontFamily: 'bold',
    fontSize: '5xl',
  },
  H2: {
    fontFamily: 'regular',
    fontSize: '4xl',
  },
  H2Bold: {
    fontFamily: 'bold',
    fontSize: '4xl',
  },
  H3: {
    fontFamily: 'regular',
    fontSize: '3xl',
  },
  H3Bold: {
    fontFamily: 'bold',
    fontSize: '3xl',
  },
  H4: {
    fontFamily: 'regular',
    fontSize: '2xl',
  },
  H4Bold: {
    fontFamily: 'bold',
    fontSize: '2xl',
  },
  H5: {
    fontFamily: 'regular',
    fontSize: 'xl',
  },
  H5Bold: {
    fontFamily: 'bold',
    fontSize: 'xl',
  },
  H6: {
    fontFamily: 'regular',
    fontSize: 'lg',
  },
  H6Bold: {
    fontFamily: 'bold',
    fontSize: 'lg',
  },
  Subtitle: {
    fontFamily: 'regular',
    fontSize: 'lg',
  },
  SubtitleBold: {
    fontFamily: 'bold',
    fontSize: 'lg',
  },
  Body: {
    fontFamily: 'regular',
    fontSize: 'md',
  },
  BodyBold: {
    fontFamily: 'bold',
    fontSize: 'md',
  },
  Caption: {
    fontFamily: 'regular',
    fontSize: 'sm',
  },
  CaptionBold: {
    fontFamily: 'bold',
    fontSize: 'sm',
  },
  NavLabel: {
    fontFamily: 'regular',
    fontSize: 'xs',
  },
  NavLabelBold: {
    fontFamily: 'bold',
    fontSize: 'xs',
  },
}
