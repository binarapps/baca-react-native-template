import { ControlledField, KeyboardAwareScrollView, LanguagePicker, Version } from '@baca/components'
import { REGEX, darkLogo, lightLogo } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Box, Button, Center, Spacer, Text } from '@baca/design-system'
import {
  useCallback,
  useSignInForm,
  useTranslation,
  useEffect,
  useScreenOptions,
} from '@baca/hooks'
import { useRouter } from 'expo-router'
import { StyleSheet, Image } from 'react-native'

export const SignInScreen = (): JSX.Element => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const { colorScheme } = useColorScheme()

  useScreenOptions({
    title: t('navigation.screen_titles.sign_in'),
  })

  const { control, errors, submit, isSubmitting, setFocus } = useSignInForm()

  useEffect(() => {
    setTimeout(() => {
      setFocus('email')
    }, 500)
  }, [setFocus])

  const navigateToSignUp = useCallback(() => push('/sign-up'), [push])
  const navigateToAppInfo = useCallback(() => push('/application-info'), [push])
  const focusPasswordInput = useCallback(() => setFocus('password'), [setFocus])

  return (
    <KeyboardAwareScrollView>
      <Box alignItems="flex-end" pr={8}>
        <LanguagePicker />
      </Box>
      <Center p={16}>
        <Image
          style={styles.logo}
          resizeMethod="resize"
          resizeMode="contain"
          source={colorScheme === 'light' ? lightLogo : darkLogo}
        />
        <Spacer y="8" />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="next"
          inputMode="email"
          isRequired
          label={t('form.labels.email')}
          name="email"
          onSubmitEditing={focusPasswordInput}
          placeholder={t('form.placeholders.email')}
          rules={{
            required: t('form.validation.required'),
            pattern: {
              value: REGEX.EMAIL,
              message: t('form.validation.invalid_email_format'),
            },
          }}
          testID="emailInput"
        />
        <ControlledField.Input
          {...{ control, errors }}
          autoCapitalize="none"
          enterKeyHint="send"
          isRequired
          label={t('form.labels.password')}
          name="password"
          onSubmitEditing={submit}
          placeholder={t('form.placeholders.password')}
          rules={{
            required: t('form.validation.required'),
          }}
          testID="passwordInput"
          type="password"
        />
        <Center mt={8}>
          <ControlledField.Checkbox
            {...{ control, errors }}
            checkboxText={t('form.checkbox.remember_me')}
            name="confirm"
            size={18}
            testID="confirmCheckbox"
          />
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            my={8}
            onPress={submit}
            testID="signInButton"
          >
            {t('sign_in_screen.sign_in')}
          </Button>
          <Text bold mb={4}>
            {t('sign_in_screen.do_not_have_an_account')}
          </Text>
          <Button.Link onPress={navigateToSignUp}>{t('sign_in_screen.sign_up')}</Button.Link>
        </Center>

        <Box mt={12} />
        {/* TODO: Remove this after implementing signing in with backend  */}
        <Text bold>Correct credentials</Text>
        <Text color="text.primary" textAlign="center">
          Email: test@example.com{'\n'}Password: 123456
        </Text>
        <Version onPress={navigateToAppInfo} />
      </Center>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: '100%',
  },
})
