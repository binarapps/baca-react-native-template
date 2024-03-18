---
id: expo-notifications
slug: /expo-notifications
title: Expo notifications
sidebar_position: 4
tags:
  - Notifications
  - Expo notifications
  - Expo
  - React
  - React Native
description: Expo notifications - check how to setup it from scratch
---

# Expo notifications configuration guide

Expo notifications are already preconfigured in this template. However, you still have to provide some secrets and keys in order to use them across your applications that uses this template.

<b>Expo Go</b> doesn't require any additional configuration so you can check notifications by copying push token (from `Settings` screen) and test notifications (on RL device) on [expo.dev/notifications](http://expo.dev/notifications) tool.

## Usage in expo dev client (expo run:\[android:ios\])

1. Make sure you have created your account in [expo.dev](http://expo.dev).
2. Follow [bootstrap](/docs/bootstrap/intro) docs
3. Follow platform specific configuration.

### Android

1. Configure firebase to get `google-services.json` file - [follow this guide](https://docs.expo.dev/push-notifications/using-fcm/).
2. Make sure that you have changed your `owner` name in `app.json`.
3. Download `google-services.json` file
4. Encode this file to base64
5. Place base64 string in environment variable in this value: `ANDROID_FIREBASE_CONFIG`
6. Provide your `experienceId` in `extra` section in `app.json` typically it follows this scheme - `@owner/slug` ex.:

```json
{
  "expo": {
    ...,
    "owner": "your_owner_name",
    "slug": "your_app_slug",
    ...,
    "extra": {
      "experienceId": "your_owner_name/your_app_slug"
    }
  }
}
```

<b>Make sure that you have provided your own secrets for those fields.</b>

7. Get credentials

For Android, you need to configure Firebase Cloud Messaging (FCM) V1 to get credentials and set up your Expo project.

Follow the steps in [Add Android FCM V1 credentials](https://docs.expo.dev/push-notifications/fcm-credentials/) to set up your credentials.

### iOS

`iOS` notification credentials are automatically generated (paid apple developer account is required to make them working).

### Test using the push notifications tool

[Check expo docs](https://docs.expo.dev/push-notifications/push-notifications-setup/#test-using-the-push-notifications-tool)

## Extending `expo-notifications` config

If u need additional `expo-notifications` config [follow this guide](https://github.com/expo/expo/tree/main/packages/expo-notifications#config-plugin-setup-optional).

## Push notifications logic

When working with expo push notifications, probably you will not need to do any additional logic, but here are described key files that you can follow when some changes will be needed:

- `NotificationsProvider`
  - assign push token when opening the app (thanks to that push token will be send every time user will change their push permissions outside the app)
  - setup push listeners
- `NotificationService`
  - Register push - ask for permissions
  - Assign push token - send push token to backend
- `useRouterNotifications`
  - connect push notiications listeners with react logic

<!-- TODO: Think about removing Notification provider or useRouterNotifications -->

## Sending push token to backend

This starter comes with support to send expo push token to backend.
