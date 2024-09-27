/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Clipboard from 'expo-clipboard'

import { Box } from '@/design-system/components/Box'
import { Center } from '@/design-system/components/Center'
import { Icon } from '@/design-system/components/Icon'
import { Row } from '@/design-system/components/Row'
import { Text } from '@/design-system/components/Text'
import { Touchable } from '@/design-system/components/Touchables'
import { useWeb } from '@/hooks'
import { showSuccessToast } from '@/utils'

type RenderExampleProps = {
  Component: React.FC<any> | React.ForwardRefExoticComponent<any> | string
  ComponentWithProps?: JSX.Element
  propsToOmmit?: string[]
}

const RenderExample = ({ Component, ComponentWithProps, propsToOmmit }: RenderExampleProps) => {
  const componentName =
    typeof Component === 'string'
      ? Component
      : Component.displayName || Component.name || 'Component'

  const componentProps = ComponentWithProps?.props || {}

  // Function to generate props as string
  const generatePropsString = (props: Record<string, any>) => {
    const filteredProps = Object.entries(props).filter(([key]) => {
      // Exclude 'children' from props
      if (key === 'children') {
        return false
      }

      // Exclude props that are not needed
      if (propsToOmmit && propsToOmmit.includes(key)) {
        return false
      }

      return true
    })

    return filteredProps

      .map(([key, value]) => {
        if (typeof value === 'string') {
          // Check if value is a code expression (e.g., starts with 't(')
          if (/^\s*t\(.+\)\s*$/.test(value)) {
            return `\n    ${key}={${value}}`
          } else {
            return `\n    ${key}="${value}"`
          }
        }
        if (typeof value === 'function') {
          return `\n    ${key}={() => {}}`
        }

        return `\n    ${key}={${JSON.stringify(value)}}`
      })
      .join('')
  }

  const propsString = generatePropsString(componentProps)

  // Handle children
  const hasChildren = 'children' in componentProps
  const childrenContent = componentProps.children

  let componentExample = ''

  if (hasChildren) {
    if (propsString) {
      componentExample = `<${componentName}${propsString}
 >
     ${childrenContent}
 </${componentName}>`
    } else {
      componentExample = `<${componentName}>
     ${childrenContent}
 </${componentName}>`
    }
  } else {
    if (propsString) {
      componentExample = `<${componentName}${propsString}
 />`
    } else {
      componentExample = `<${componentName} />`
    }
  }

  // Function to handle copying code to clipboard
  const handleCopyCode = () => {
    Clipboard.setStringAsync(componentExample)
    // Optionally, display a confirmation to the user

    showSuccessToast({
      title: 'Code copied to clipboard!',
      description: 'You can paste it in your code editor now.',
    })
  }

  return (
    <Box borderRadius={8} borderColor="utility.gray.100" borderWidth={1} minWidth={400}>
      <Row
        borderTopEndRadius={6}
        borderTopLeftRadius={6}
        justifyContent="space-between"
        alignItems="center"
        bg="utility.gray.100"
        p={2}
      >
        <Text.SmMedium>tsx</Text.SmMedium>
        <Touchable flexDirection="row" gap={1}>
          <Icon name="file-copy-2-fill" size={16} />
          <Text.SmMedium onPress={handleCopyCode}>Copy Code</Text.SmMedium>
        </Touchable>
      </Row>
      <Box bg="bg.primary" borderRadius={6} p={4}>
        <Text.SmMedium>{componentExample}</Text.SmMedium>
      </Box>
    </Box>
  )
}

export const RenderComponentWithExample = ({ ComponentWithProps, ...rest }: RenderExampleProps) => {
  const { shouldApplyMobileStyles } = useWeb()

  return (
    <Row gap={2}>
      <Center p={4} bg="utility.gray.100" borderRadius={8}>
        {ComponentWithProps}
      </Center>
      <Box />
      {/* Show only on tablet and web */}
      {!shouldApplyMobileStyles && (
        <RenderExample ComponentWithProps={ComponentWithProps} {...rest} />
      )}
    </Row>
  )
}
