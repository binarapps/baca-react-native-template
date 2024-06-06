import { Box, Icon } from '@baca/design-system'
import { IconNames } from '@baca/types'

type FeatureIconSize = 'sm' | 'md' | 'lg' | 'xl'

const featuredIconSizeVariants: {
  [key in FeatureIconSize]: { iconSize: number; borderRadius: number; padding: number }
} = {
  // FIXME: add values according to design theme
  sm: { iconSize: 16, borderRadius: 6, padding: 2.5 },
  md: { iconSize: 20, borderRadius: 8, padding: 2.5 },
  lg: { iconSize: 24, borderRadius: 10, padding: 3 },
  xl: { iconSize: 28, borderRadius: 12, padding: 14 },
}

// FIXME: Add different variants for featuredIcon according to design https://www.figma.com/file/Zk5v95NgasXz7o84UABvH3/%E2%9D%96-BACA---Untitled-UI-(v4.0---plik-madka)?type=design&node-id=1102-5338&mode=design&t=sc8jQ2o3oHFoeslg-4
export const FeaturedIcon = ({
  iconName,
  size = 'md',
}: {
  iconName: IconNames
  size?: FeatureIconSize
}) => {
  const icon = featuredIconSizeVariants[size]
  return (
    <Box
      borderColor="featured.icon.modern.border"
      borderRadius={icon.borderRadius}
      borderWidth={1}
      p={icon.padding}
    >
      <Icon name={iconName} size={icon.iconSize} />
    </Box>
  )
}
