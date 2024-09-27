---
id: composition-components
slug: /composition-components
title: Composition components
sidebar_position: 5
tags:
  - UI
  - Box
  - Components
  - Expo
  - React
  - React Native
description: Deeplinking - check how to setup it from scratch
---

# Composition Components

Components in [baca-react-native-template](https://github.com/binarapps/baca-react-native-template) follows [atomic design methodology](https://atomicdesign.bradfrost.com/).

For more information on such a design methodology, visit the page above.
On the other hand, below you can find documentation of the implemented components

## Info

We have multiple composition components:

- Box - extension of react native View component, with composition props
- ScrollView - extension of react native View component, with composition props applied as contentContainerStyle prop
- Touchable - extension of react native Touchable component, with composition props
- Absolute - Box positioned to absolute
- Center - Centered box
- Row - Box + direction to row
- HStack - Same as Row
- Column - Box + direction to column
- VStack - Same as column
- Spacer - accepts params "x" and "y" that then are reflected on UI

## Composition props

This document provides an overview of the styling properties available for composition components in our design system. These props allow for flexible and consistent styling across your application.

### Sizing Props (`SizingProps`)

Properties to control the dimensions of components.

- **Width Properties:**

  - `w` or `width`: Set the width.
  - `minW` or `minWidth`: Set the minimum width.
  - `maxW` or `maxWidth`: Set the maximum width.

- **Height Properties:**
  - `h` or `height`: Set the height.
  - `minH` or `minHeight`: Set the minimum height.
  - `maxH` or `maxHeight`: Set the maximum height.

**Accepted Values (`SizingValue`):**

- Predefined size keys from the theme (`_appTheme.size`).
- Exact dimensions:
  - Numbers (interpreted as pixels).
  - Strings with units (e.g., `"100px"`).
  - Percentages (e.g., `"50%"`).
- `DimensionValue`: A type representing dimension units.

### Background Props (`BackgroundProps`)

Properties to set background colors and opacity.

- `bg` or `backgroundColor`: Apply a background color from predefined `ColorNames`.
- `bgOpacity` or `backgroundOpacity`: Set the background opacity (value between 0 and 1).

### Spacing Props (`SpacingProps`)

Properties for margin and padding.

- **Margin Properties:**

  - `m`: Margin on all sides.
  - `mt`: Margin-top.
  - `mr`: Margin-right.
  - `mb`: Margin-bottom.
  - `ml`: Margin-left.
  - `mx`: Horizontal margins (`ml` and `mr`).
  - `my`: Vertical margins (`mt` and `mb`).

- **Padding Properties:**

  - `p`: Padding on all sides.
  - `pt`: Padding-top.
  - `pr`: Padding-right.
  - `pb`: Padding-bottom.
  - `pl`: Padding-left.
  - `px`: Horizontal padding (`pl` and `pr`).
  - `py`: Vertical padding (`pt` and `pb`).

- `gap`: Space between child elements in layouts (useful for flexbox grids).

**Accepted Values:** Same as `SizingValue`.

### Flex Props (`FlexProps`)

Properties for flexbox layout management.

- `flex`: Define how a flex item will grow or shrink.
- `flexGrow`: Control the growth of a flex item.
- `flexShrink`: Control the shrinkage of a flex item.
- `flexBasis`: Set the initial main size of a flex item.
- `justifyContent`: Align items along the main axis.
- `alignItems`: Align items along the cross axis.
- `alignContent`: Align flex lines within a flex container.
- `alignSelf`: Override `alignItems` for individual items.
- `flexDirection`: Define the direction of the main axis (`row`, `column`, etc.).
- `flexWrap`: Control whether flex items wrap onto multiple lines.

### Effects Props (`EffectsProps`)

Properties for visual effects.

- `opacity`: Set the opacity of the component (float between 0 and 1).

### Borders Props (`BordersProps`)

Properties to style borders.

- `borderColor`: Set the border color using `ColorNames`.
- `borderWidth`: Set the width of the border (in pixels).
- `borderStyle`: Define the style of the border (`solid`, `dotted`, etc.).
- `borderRadius`: Apply rounded corners (in pixels).

**Individual Border Radius Properties:**

- `borderTopLeftRadius`
- `borderTopEndRadius`
- `borderBottomLeftRadius`
- `borderBottomEndRadius`

**Individual Border Width Properties:**

- `borderTopWidth`
- `borderBottomWidth`
- `borderLeftWidth`
- `borderRightWidth`

**Note:** All border measurements are in pixels and should be provided as numbers.

### Layout Props (`LayoutsProps`)

Properties for positioning and layout behavior.

- `position`: Set the positioning method (`static`, `relative`, `absolute`, etc.).
- `zIndex`: Control the stack order of the component.
- `top`, `right`, `bottom`, `left`: Offset the component from its positioned parent.
- `overflow`: Specify how to handle content that overflows the component's box (`visible`, `hidden`, `scroll`).

### Combined Styled Props (`StyledProps`)

All the above properties are combined into a single type for ease of use. That means you can use them in all composition components all at once.

## Example of use

```tsx
import { Absolute } from '@/design-system'

const MyComponent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Absolute>{children}</Absolute>
)

export default MyComponent
```
