import { Box, Text, Button, Row } from '@baca/design-system'
import * as ImagePicker from 'expo-image-picker'
import { t } from 'i18next'
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

export const ProfileEditImage: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null)

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <Box borderColor="border.secondary" borderTopWidth={1} py={6} /* mb={isWeb ? 10 : 4} */>
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
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
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
    width: 100,
  },
  marginBottom: {
    marginBottom: 10,
  },
  placeholder: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    // color: '#888',
  },
})
