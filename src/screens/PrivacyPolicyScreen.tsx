import { LandingHeader } from '@baca/components'
import { ScrollView, Text } from '@baca/design-system'
import { SafeAreaView } from 'react-native-safe-area-context'

export const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView>
      <LandingHeader />
      <ScrollView pb={20} px={4}>
        <Text textAlign="justify">
          {`
Privacy Policy
Last Updated: April 11, 2024

This Privacy Policy applies to the website binarapps.online ("BACA") and governs the privacy of its users who choose to use it.

BACA is a React Native code boilerplate designed to assist entrepreneurs in launching their startups more efficiently.

Data Collection:

BACA collects and processes the following user data:

Name
Email
Additionally, BACA may collect non-personal data through web cookies.

Purpose of Data Collection:

The collected data is used for order processing purposes only.

Data Sharing:

BACA does not share user data with any third parties.

Children's Privacy:

BACA does not knowingly collect any data from children.

Updates to the Privacy Policy:

Users will be notified of any updates to this Privacy Policy via email.

Contact Information:

For any inquiries or concerns regarding this Privacy Policy, please contact us at contact@binarapps.online
        `}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
