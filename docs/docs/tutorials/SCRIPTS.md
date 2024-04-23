---
id: scripts
slug: /scripts
title: Scripts
sidebar_position: 8
tags:
  - Scripts
  - Expo
  - React
  - React Native
description: BACA - scripts
---

<!-- README document about scrips used in the template to perform build / upload / submit process -->

# Scripts

Here is a list of useful scripts in this starter:

- [yarn g](#generators)
- [yarn b](#bootstrap-new-app)
- [yarn generate:last:publish](#generate-last-update-info)

## Generators

Run this command to see magic:

```
yarn g
```

OR

```bash
yarn baca generate
```

This will show you list of generators, run this to test it :)

## Boostrap new app

Check [boostrap docs](/docs/bootstrap/testing) to see more details.

```
yarn b
```

OR

```bash
yarn baca:boostrap
```

## Envrionment variables

Check [doppler documentantion](/docs/doppler-config) to see more details

## Generate last update info

This script is automatically executed after running `yarn update:production` (or staging|qa), this will return ids of last udpate:

```
BACA - 2.1.0:
- android: 8f6577b8-f1a6-46de-9471-8a0ff072ccc9
- ios: a8bdc3aa-239a-48da-b76e-c259af5567b0
```

You can easily share this with testers or clients, thanks to that users will be sure what version is currently in the app.

## Generate icon types

This script has to be executed when new icons where added to the icomoon.ttf icons set in case to provide proper types for components which use icons.

If script won't be executed typescript will throw an error when trying to use newly added icon.
