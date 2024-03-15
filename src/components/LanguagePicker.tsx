import { Icon, Row, Text } from '@baca/design-system/components'
import { Touchable, TouchableProps } from '@baca/design-system/components/Touchables/Touchable'
import { useCallback, useTranslation, useTheme } from '@baca/hooks'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { Menu } from './organisms/Menu'
import languages from '../../assets/languages.json'

export const LanguagePicker: React.FC = () => {
  const { size } = useTheme()

  const { i18n } = useTranslation()
  const language = i18n?.language?.slice?.(0, 2).toUpperCase() as keyof typeof languages
  const isOpen = useSharedValue(false)

  const rotateZ = useDerivedValue(() => withTiming(isOpen.value ? 180 : 0))
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotateZ.value}deg` }],
  }))

  const styles = StyleSheet.create({
    icon: { height: size['8'], justifyContent: 'center' },
  })

  const iconColor = 'text.brand.primary'

  const renderTrigger = useCallback(
    (
      props: TouchableProps,
      state: {
        isOpen: boolean
      }
    ) => {
      // Set animated value based on a `Menu` state
      isOpen.value = state.isOpen

      return (
        <Touchable {...props}>
          <Row alignItems="center">
            <Text.XlRegular pr={2}>{languages?.[language]?.emoji}</Text.XlRegular>
            <Animated.View style={[animatedIconStyle, styles.icon]}>
              <Icon size={24} name="arrow-down-s-line" color={iconColor} />
            </Animated.View>
          </Row>
        </Touchable>
      )
    },
    [animatedIconStyle, isOpen, language, styles.icon, iconColor]
  )

  const handleItemPress = useCallback(
    (lng: string) => () => {
      i18n.changeLanguage(lng.toLowerCase())
    },
    [i18n]
  )

  return (
    <Menu trigger={renderTrigger}>
      {Object.entries(languages).map(([key, languageData]) => (
        <Menu.Item
          onPress={handleItemPress(key)}
          key={key}
        >{`${languageData.emoji} ${languageData.language}`}</Menu.Item>
      ))}
    </Menu>
  )
}
