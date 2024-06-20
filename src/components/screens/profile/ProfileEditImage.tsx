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
    <Row style={styles.container}>
      <Box style={styles.textContainer}>
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
            <Text fontSize={11} color="Gray modern.600">
              {t('profile_screen.photo_innerText')}
            </Text>
          </Box>
        )}
      </Box>
      <Button onPress={pickImage}>{t('common.upload')}</Button>
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 800,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    borderRadius: 32,
    height: 64,
    marginBottom: 10,
    marginRight: 82,
    overflow: 'hidden',
    width: 64,
  },
  placeholder: {
    alignItems: 'center',
    backgroundColor: themeColors.primitives['Gray neutral']['50'],
    height: '100%',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginBottom: 30,
    maxWidth: 260,
    minWidth: 260,
  },
})
