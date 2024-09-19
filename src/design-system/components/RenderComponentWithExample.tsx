/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@baca/design-system/components/Box'
import { Center } from '@baca/design-system/components/Center'
import { Icon } from '@baca/design-system/components/Icon'
import { Row } from '@baca/design-system/components/Row'
import { Text } from '@baca/design-system/components/Text'
import { Touchable } from '@baca/design-system/components/Touchables'
import { useWeb } from '@baca/hooks'
import { showSuccessToast } from '@baca/utils'
import * as Clipboard from 'expo-clipboard'

const RenderExample = ({
  Component,
  ComponentWithProps,
}: {
  Component: React.FC<any> | React.ForwardRefExoticComponent<any> | string
  ComponentWithProps?: JSX.Element
}) => {
  const componentName =
    typeof Component === 'string'
      ? Component
      : Component.displayName || Component.name || 'Component'

  const componentProps = ComponentWithProps?.props || {}

  // Function to generate props as string
  const generatePropsString = (props: Record<string, any>) => {
    return Object.entries(props)
      .filter(([key]) => key !== 'children') // Exclude 'children' from props
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
    <Box
      borderRadius={8}
      borderColor="utility.gray.100"
      borderWidth={1}
      gap={2}
      bg="Base.black"
      minWidth={400}
    >
      <Row
        borderTopEndRadius={6}
        borderTopLeftRadius={6}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        bg="utility.gray.100"
        p={2}
      >
        <Text.SmMedium>tsx</Text.SmMedium>
        <Touchable flexDirection="row" gap={1}>
          <Icon name="file-copy-2-fill" size={16} />
          <Text.SmMedium onPress={handleCopyCode}>Copy Code</Text.SmMedium>
        </Touchable>
      </Row>
      <Box px={4} pb={4}>
        <Text.SmMedium>{componentExample}</Text.SmMedium>
      </Box>
    </Box>
  )
}

export const RenderComponentWithExample = ({
  Component,
  ComponentWithProps,
}: {
  Component: React.FC<any> | React.ForwardRefExoticComponent<any> | string
  ComponentWithProps?: JSX.Element
}) => {
  const { shouldApplyMobileStyles } = useWeb()

  return (
    <Row gap={2} width="100%">
      <Center p={4} bg="utility.gray.100" borderRadius={8}>
        {ComponentWithProps}
      </Center>
      <Box />
      {/* Show only on tablet and web */}
      {!shouldApplyMobileStyles && (
        <RenderExample Component={Component} ComponentWithProps={ComponentWithProps} />
      )}
    </Row>
  )
}
