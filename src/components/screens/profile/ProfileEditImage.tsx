import { isWeb } from '@baca/constants'
import { Box, Text, Button, Row, themeColors } from '@baca/design-system'
import * as ImagePicker from 'expo-image-picker'
import { t } from 'i18next'
import { useState, useCallback } from 'react'
import { Image, StyleSheet } from 'react-native'

export const ProfileEditImage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri)
    }
  }, [])

  return (
    <Box borderColor="border.secondary" borderTopWidth={1} py={6}>
      <Box style={styles.marginBottom}>
        <Text.SmBold color="text.primary">{t('profile_screen.your_photo')}</Text.SmBold>
        <Text.SmRegular color="text.secondary">
          {t('profile_screen.your_photo_description')}
        </Text.SmRegular>
      </Box>
      <Box style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Box style={styles.placeholder}>
            <Text color="Gray modern.600">{t('profile_screen.photo_innerText')}</Text>
          </Box>
        )}
      </Box>
      <Row maxW={800} justifyContent="flex-end">
        <Button onPress={pickImage}>{t('common.upload')}</Button>
      </Row>
    </Box>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    alignSelf: 'center',
    borderRadius: 50,
    height: 100,
    marginBottom: 10,
    overflow: 'hidden',
    right: isWeb ? 150 : 0,
    width: 100,
  },
  marginBottom: {
    marginBottom: 10,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: themeColors.primitives['Gray neutral']['50'],
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
})
