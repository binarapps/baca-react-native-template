import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { ControlledField, KeyboardAwareScrollView, TextArea } from '@/components'
import { Button, Spacer, Text } from '@/design-system'
import { useMemo, useScreenOptions, useTestForm, useTranslation } from '@/hooks'

const mapItem = (item: string) => ({
  value: item,
  label: item,
  labelInDropdown: item,
})

const shoeSizes = [
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
]
const mappedShoeSizes = shoeSizes?.map(mapItem)

const AGES = ['18-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100']
const mappedAges = AGES?.map(mapItem)

const MUSICS = ['Metal', 'Heavy Metal', 'Rock', 'Pop', 'Rap']
const mappedMusics = MUSICS?.map(mapItem)

export const TestFormScreen = (): JSX.Element => {
  const { t } = useTranslation()
  const { bottom } = useSafeAreaInsets()

  useScreenOptions({
    title: t('navigation.screen_titles.test_form'),
  })

  const { control, errors, submit, VALIDATION, setFocus } = useTestForm()

  const interests = useMemo(
    () =>
      [
        'IT',
        t('test_form.cooking'),
        t('test_form.sport'),
        t('test_form.games'),
        t('test_form.dancing'),
      ].map(mapItem),
    [t]
  )

  const education = useMemo(
    () =>
      [
        t('test_form.primary'),
        t('test_form.middle'),
        t('test_form.secondary'),
        t('test_form.postsecondary'),
      ]?.map(mapItem),
    [t]
  )

  const sex = useMemo(() => [t('test_form.male'), t('test_form.female')]?.map(mapItem), [t])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 16 }]}
    >
      <Text type="display" variant="LgBold" fontWeight="bold" py={2}>
        {t('test_form.contact_data')}
      </Text>
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        isRequired
        label={t('test_form.name_placeholder')}
        name="name"
        onSubmitEditing={setFocus('surname')}
        placeholder={t('test_form.name_placeholder')}
        rules={VALIDATION.name}
      />
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        mt={2}
        isRequired
        label={t('test_form.surname_placeholder')}
        name="surname"
        onSubmitEditing={setFocus('email')}
        placeholder={t('test_form.surname_placeholder')}
        rules={VALIDATION.surname}
      />
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        isRequired
        label={t('test_form.email_placeholder')}
        mt={2}
        name="email"
        onSubmitEditing={setFocus('phone')}
        placeholder={t('test_form.email_placeholder')}
        rules={VALIDATION.email}
      />
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        isRequired
        label={t('test_form.phone_placeholder')}
        mt={2}
        name="phone"
        onSubmitEditing={setFocus('postalCode')}
        placeholder={t('test_form.phone_placeholder')}
        rules={VALIDATION.phone}
      />
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        isRequired
        label={t('test_form.postalCode_placeholder')}
        mt={2}
        name="postalCode"
        onSubmitEditing={setFocus('city')}
        placeholder={t('test_form.postalCode_placeholder')}
        rules={VALIDATION.postalCode}
      />
      <ControlledField.Input
        {...{ control, errors }}
        enterKeyHint="next"
        isRequired
        label={t('test_form.city_placeholder')}
        mt={2}
        name="city"
        placeholder={t('test_form.city_placeholder')}
        rules={VALIDATION.city}
      />
      <ControlledField.RadioGroup
        {...{ control, errors }}
        isRequired
        name="age"
        items={mappedAges}
        rules={VALIDATION.age}
        label={t('test_form.age')}
      />
      <ControlledField.RadioGroup
        {...{ control, errors }}
        isRequired
        name="sex"
        items={sex}
        rules={VALIDATION.sex}
        label={t('test_form.sex')}
      />
      <ControlledField.Select
        {...{ control, errors }}
        isRequired
        items={education}
        label={t('test_form.education')}
        name="education"
        placeholder={t('test_form.education')}
        rules={VALIDATION.education}
      />
      <ControlledField.Select
        {...{ control, errors }}
        isRequired
        items={mappedShoeSizes}
        label={t('test_form.shoe_size')}
        name="shoeSize"
        placeholder={t('test_form.shoe_size')}
        rules={VALIDATION.shoeSize}
      />
      <ControlledField.CheckboxGroup
        {...{ control, errors }}
        items={mappedMusics}
        isRequired
        label={t('test_form.which_music')}
        name="music"
        rules={VALIDATION.music}
      />
      <ControlledField.EmojiPicker
        {...{ control, errors }}
        isRequired
        label={t('test_form.icon')}
        placeholder={t('test_form.icon')}
        name="icon"
        rules={VALIDATION.icon}
      />
      <ControlledField.CheckboxGroup
        {...{ control, errors }}
        items={interests}
        isRequired
        label={t('test_form.interests')}
        name="interests"
        rules={VALIDATION.interests}
      />
      <Text fontWeight="bold" py={2}>
        {t('test_form.additional_comment')}
      </Text>
      <Controller
        {...{ control }}
        name="comment"
        render={({ field }) => (
          <TextArea
            placeholder={t('test_form.comment')}
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />
      <Button my={4} onPress={submit}>
        {t('test_form.submit')}
      </Button>
      <Spacer y={`${bottom}px`} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
})
