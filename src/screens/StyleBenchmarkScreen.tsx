import { PropsWithChildren, useLayoutEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import { Box, Row, Text as BacaText } from '@/design-system'
import { useScreenOptions, useState } from '@/hooks'

const COUNT = 1000

const NativeViews = () => {
  return (
    <View style={styles.viewsContainer}>
      {new Array(COUNT).fill(0).map((_, i) => (
        <View key={i} style={styles.styledView} />
      ))}
    </View>
  )
}

const NativeTexts = () => {
  return (
    <View style={styles.viewsContainer}>
      {new Array(COUNT).fill(0).map((_, i) => (
        <Text key={i} style={styles.styledText}>
          {i}
        </Text>
      ))}
    </View>
  )
}

const BacaViews = () => {
  return (
    <Row flex={1}>
      {new Array(COUNT).fill(0).map((_, i) => (
        <Box key={i} borderColor="Error.600" borderWidth={2} p={2} flex={1} />
      ))}
    </Row>
  )
}
const BacaTexts = () => {
  return (
    <Row flex={1}>
      {new Array(COUNT).fill(0).map((_, i) => (
        <BacaText key={i} borderColor="Error.600" borderWidth={2} p={5} flex={1}>
          {i}
        </BacaText>
      ))}
    </Row>
  )
}

const TimedRender = (props: PropsWithChildren) => {
  const [start] = useState(Date.now())
  const [end, setEnd] = useState(0)

  useLayoutEffect(() => {
    setEnd(Date.now())
  }, [])

  return (
    <>
      {!!end && <Text style={styles.timeText}>Took {end - start}ms</Text>}
      {props.children}
    </>
  )
}

type StyleType = 'React Native' | 'React Native Text' | 'Baca' | 'Baca Text' | undefined

export const StyleBenchmarkScreen = (): JSX.Element => {
  // Setting screen title
  useScreenOptions({
    title: 'Style Benchmark',
  })

  const [styleType, setStyleType] = useState<StyleType>(undefined)

  const onStyleTypePress = (curry: StyleType) => () => {
    setStyleType(curry)
  }

  const renderStyleLibrary = () => {
    switch (styleType) {
      case 'React Native':
        return <NativeViews />
      case 'React Native Text':
        return <NativeTexts />
      case 'Baca':
        return <BacaViews />
      case 'Baca Text':
        return <BacaTexts />
      default:
        return null
    }
  }

  // Render
  return (
    <View>
      <Button title="React Native" onPress={onStyleTypePress('React Native')} />
      <Button title="React Native Text" onPress={onStyleTypePress('React Native Text')} />
      <Button title="Baca" onPress={onStyleTypePress('Baca')} />
      <Button title="Baca Text" onPress={onStyleTypePress('Baca Text')} />
      {styleType ? (
        <TimedRender key={styleType}>
          <Text style={styles.text}>
            Rendering with <Text style={styles.bold}>{styleType}</Text>
          </Text>
        </TimedRender>
      ) : null}
      {renderStyleLibrary()}
    </View>
  )
}

const styles = StyleSheet.create({
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // eslint-disable-next-line react-native/no-color-literals
  styledText: {
    borderColor: 'red',
    borderWidth: 2,
    color: 'green',
    padding: 8,
  },
  // eslint-disable-next-line react-native/no-color-literals
  styledView: {
    borderColor: 'red',
    borderWidth: 2,
    padding: 8,
  },
  // eslint-disable-next-line react-native/no-color-literals
  text: {
    color: 'blue',
    marginVertical: 12,
  },
  // eslint-disable-next-line react-native/no-color-literals
  timeText: {
    color: 'green',
    fontSize: 18,
    marginTop: 12,
  },
  viewsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
})
