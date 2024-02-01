import {
  EventListenerCallback,
  EventMapCore,
  usePreventRemoveContext,
  useRoute,
} from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { nanoid } from 'nanoid/non-secure'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useLatestCallback from 'use-latest-callback'

import { alert } from '~utils'

// This is copy of this hook: usePreventRemove
// https://github.com/react-navigation/react-navigation/blob/90cfbf23bcc5259f3262691a9eec6c5b906e5262/packages/core/src/usePreventRemove.tsx#L17
// Previous implementation wasn't working properly on expo router
export const usePreventGoBack = (preventRemove = true) => {
  const { t } = useTranslation()
  const [id] = React.useState(() => nanoid())

  const navigation = useNavigation()
  const { key: routeKey } = useRoute()

  const { setPreventRemove } = usePreventRemoveContext()

  React.useEffect(() => {
    setPreventRemove(id, routeKey, preventRemove)
    return () => {
      setPreventRemove(id, routeKey, false)
    }
  }, [setPreventRemove, id, routeKey, preventRemove])

  const beforeRemoveListener = useLatestCallback<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    EventListenerCallback<EventMapCore<any>, 'beforeRemove'>
  >((e) => {
    if (!preventRemove) {
      return
    }

    e.preventDefault()

    alert(
      t('navigation.prevent_go_back_alert.title'),
      t('navigation.prevent_go_back_alert.description'),
      [
        {
          text: t('navigation.prevent_go_back_alert.dont_leave'),
          style: 'cancel',
          onPress: () => undefined,
        },
        {
          text: t('navigation.prevent_go_back_alert.discard'),
          style: 'destructive',
          onPress: () => navigation.dispatch(e?.data?.action),
        },
      ]
    )
  })

  React.useEffect(
    () => navigation?.addListener('beforeRemove', beforeRemoveListener),
    [navigation, beforeRemoveListener]
  )
}
