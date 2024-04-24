import { Pressable } from '@bacons/react-views'
import { Link } from 'expo-router'
import { PressableStateCallbackType, ViewStyle } from 'react-native'

import { useIsTabSelected } from '../hooks'
import { TabbedNavigator } from '../tab-slot'

export function TabBarItemWrapper({
  children,
  id,
  name,
  onPress,
  params,
  style,
}: {
  children?: (
    props: PressableStateCallbackType & { hovered: boolean; focused: boolean }
  ) => JSX.Element
  id: string
  name: string
  onPress?: () => void
  params?: Record<string, string>
  style?: ViewStyle
}) {
  const focused = useIsTabSelected(id)

  if (onPress) {
    return (
      <Pressable hitSlop={5} onPress={onPress}>
        {(props) => children?.({ ...props, focused })}
      </Pressable>
    )
  }

  if (name.startsWith('/') || name.startsWith('.')) {
    return (
      <Link href={{ pathname: name, params }} asChild style={style}>
        <Pressable hitSlop={5}>{(props) => children?.({ ...props, focused })}</Pressable>
      </Link>
    )
  }
  return (
    <TabbedNavigator.Link name={id} asChild style={style}>
      <Pressable hitSlop={5}>{(props) => children?.({ ...props, focused })}</Pressable>
    </TabbedNavigator.Link>
  )
}
