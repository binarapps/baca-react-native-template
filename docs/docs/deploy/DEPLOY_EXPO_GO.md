---
id: deploy-expo-go
slug: /deploy/expo-go
title: Testing in Expo Go
sidebar_position: 2
tags:
  - Deploy
  - Android app
  - Mobile development
  - React native
description: Testing in Expo Go
---

# Testing in Expo Go 🕐

When to use the Expo Go app:

- If you are developing an app - for other developers and for fast internal testing
- If you are developing an app, and do not have access to App Store and Google Play Store - for internal and external testing

When not to use the Expo Go app:

<ul>
    <li>
        If you have applied native features to an app for example - one-signal (libraries that need to apply native code to the app with expo-plugins)
        <ul>
            <li>in that case, you could use expo-dev-client to create your own Expo Go app with injected native code into it</li>
        </ul>
    </li>
</ul>

### Process:

1.Deploy app for tests in expo go.

The easiest way to allow testers to test an app on physical devices is to deploy the app to Expo Go.

If you follow the previous steps of instructions, have configured the expo project, logged into the Expo account, and have added an app configuration, you will be ready to deploy an app with just one command.

In terminal run:

```bash
yarn update:expo_go
```

2.Test the app on the physical device

<ol type="a">
    <li>
        Install the Expo Go app from Play Store (Android) or from App Store (iOS). **
        Your app will run in the Expo Go application as the wrapper to your original app.
    </li>
    <li>Log in to your Expo account in the Expo Go app.</li>
    <li>Select the proper organization, in which your app is deployed.</li>
    <li>Select the proper project (your app).</li>
    <li>Select the proper branch from which your build (update) was done.</li>
    <li>Select the proper build (update), that you want to test. </li>
</ol>

### Summary:

<ul>
    <li>You should have in mind that testing in the Expo Go app is limited to apps that do not apply native features for example - one-signal (libraries that need to apply native code to an app with expo-plugins).</li>
    <li>
        Testing inside the Expo Go app is divided by a branch (git branch) from which are generated builds (updates) - could be done for example - for every feature branch
        <ul>
            <li>you can easily switch between different branches - for example - test multiple features from code review just in one place (Expo Go)</li>
        </ul>
    </li>
    <li>
        If multiple builds (updates) are generated for the same branch, in the Expo Go app you can switch between each build 
        <ul>
            <li>you can easily switch between different builds (on the same feature branch) for example -to check when something was broken</li>
        </ul>
    </li>
</ul>
