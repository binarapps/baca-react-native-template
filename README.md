<p align="center">
    <img src="assets/logo/logo-light.png" alt="Logo">
</p>

[![MIT License](https://img.shields.io/npm/l/@binarapps/baca-react-native-template?style=flat-square)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/npm/v/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/v/@binarapps/baca-react-native-template?style=flat-square)
[![MIT License](https://img.shields.io/npm/dt/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/dt/@binarapps/baca-react-native-template?style=flat-square)
[![MIT License](https://img.shields.io/github/stars/binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/github/stars/binarapps/baca-react-native-template?style=flat-square)
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

# @binarapps/baca-react-native-template

> **BACA** - **B**INAR **A**PPS **C**ORE **A**PPLICATION
>
> This repository is part of whole ecosystem, and it only contains React Native code

This is a template to be used with react native and expo. It includes all the necessary stuff to start working with expo framework. It has the most popular packages included, so it's easier to start coding the app itself without all the necessary boilerplate setup.

## Documentation

Check out our [documentation page](https://baca-docs.vercel.app/docs/overview), it contains:

- Bootstrapping project - tutorial how to easy setup from scratch
- Deploying app
- Tutorials how to:
  - manage environment variables
  - use jotai as state management tool

## Why to use?

We know there are a lot of project starters for react native, but we have some good features:

- Fully works with **EXPO GO**
  - Good for start of the project, later you can switch to expo-dev-client
- Fully works on **WEB**
  - If you want to develop apps both on web and mobile this starter is good choice for you
- **Code generators** (create new screen / create new component)
- **Fully + Strong typed**
- **App deployment documentation** (currently in progress, but it will be added in near future)

## How it looks?

### WEB

- **[DEMO APP](https://baca-six.vercel.app)**

### MOBILE + WEB

<!-- TODO: Add new recording -->

[![baca-react-native-template binarapps](https://img.youtube.com/vi/NmTd5nXXTLI/0.jpg)](https://www.youtube.com/watch?v=NmTd5nXXTLI)

## How to use?

We have prepared a detailed documentation for how to run project with this template - **[Bootstrap docs](https://baca-docs.vercel.app/docs/overview)**

It's great for production project, but if you want to just test it, you can follow the quick steps (on the bottom).

### Quick steps:

- `npx create-expo-app --template=@binarapps/baca-react-native-template name_of_your_app`
- `cd name_of_your_app`
- `yarn bootstrap` - the cli will ask you some questions about your app (you can fill all this data later)

## What's inside?

[![MIT License](https://img.shields.io/npm/types/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/types/@binarapps/baca-react-native-template?style=flat-square)
[![MIT License](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/expo?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/expo?style=flat-square)
[![MIT License](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/@react-navigation/native?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/@react-navigation/native?style=flat-square)

### Implemented custom features

- custom cli
  - run `yarn baca` to see available options
- generators:
  - `yarn baca generate` | `yarn g`
- support of multiple environments
  - production, staging, qa
- eas configuration
  - update, build, submit
- deployment docs
  - https://baca-docs.vercel.app/docs/overview
- verifying code on pull request - pipelines
  - when creating pull request on github, there are tests, linters and types checks. If there will be some error you will be notified that something is wrong.
- custom fonts
  - wait to load fonts and all the assets
- dark / light theme support
  - color scheme detection (dark / light mode toggle)
- navigation
  - screen tracking hook
  - state persistence on development mode
  - prevent go back (to be used on forms for example)
  - strong types, prevent issues in future
- auth flow ready for implementation details
  - using expo-secure-store module to save user token
  - right now it has simple signIn/signOut flow
- animations with `reanimated` and `moti`

### Implemented libraries

- TypeScript
  - app is fully typed
- [Expo v49](https://github.com/expo/expo)
- [React Navigation v6](https://github.com/react-navigation/react-navigation)
- Prettier and eslint
  - code formatting
  - code checking
- Babel-module-resolver
  - unified imports
- jest and @testing-library/react-native
  - unit tests
- i18next
  - translations
  - language detection
- `@gorhom/bottom-sheet`
- Expo-notifications
  - You can read how to configure them [here](/NOTIFICATIONS_SETUP.MD)
- Reactotron
  - used for debugging
- [Reanimated v2](https://github.com/software-mansion/react-native-reanimated)
- Axios + React query
  - Fetching data from backend
- Jotai
  - State management

## What is planned in the future?

- tutorial on how to use features
  - navigation
  - deepLinking
  - auth flows
  - components
  - react query
  - api calls
  - state management tool
- Add designs (figma) and redesign whole app
- Updating expo versions (in future)
- Deploy app to App Store and Play Store
  - Create sample app and document the process of deployment
- Improve mock server logic
- add commit lint

### Implementations to add

- [expo image](https://github.com/expo/expo/tree/main/packages/expo-image)
- [FlashList](https://github.com/Shopify/flash-list)
- [ZOD](https://github.com/colinhacks/zod)

## How to contribute?

Contributions are always welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for ways to get started.

Please adhere to this project's `code of conduct`.

## How to run locally?

Clone the project

```bash
  git clone https://github.com/binarapps/baca-react-native-template.git
```

Go to the project directory

```bash
  cd baca-react-native-template
```

Install dependencies

```bash
  yarn
```

Start the expo server

```bash
  yarn start
```

Environment variables instruction:

1. Create empty file `scripts/doppler_variables.sh` and add this script to new created file.

- run `yarn prepare:env_file` - this will copy template and place it in `scripts/doppler_variables.sh`

2. Add correct values to variables (ask one of the developers for that), example:

```bash
export DOPPLER_TOKEN_DEVELOPMENT=dp.st.alpha.XXXXxxxxXXXXxxxxXXXXxxxx
```

Start the expo server

```bash
  yarn start
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to me at mateusz.rostkowsky995@gmail.com

## Contributors

- [Kacper Grzeszczyk](https://www.github.com/kacgrzes) - @kacgrzes
- [Mateusz Rostkowski](https://www.github.com/MateuszRostkowski) - @MateuszRostkowski
- [Michał Szalowski](https://www.github.com/MSzalowski) - @MSzalowski
- [Jakub Zagórski](https://www.github.com/zagoorland) - @zagoorland
- [Łukasz Patalan](https://github.com/lukasz-patalan) - @lukasz
- [Mario Gliwa](https://github.com/mario688) - @mario688
- [Michał Baumruck](https://github.com/micbaumr) - @micbaumr
- [Andrzej Zaborski](https://github.com/AnMiZa) - @AnMiZa
- [Bartłomiej Sworzeń](https://github.com/Sworzen1) - @Sworzen1
- [Karol Andracki](https://github.com/Karol-Andracki) - @karol-andracki
- [Weronika Grzeszczyk](https://github.com/vercia) - @vercia
- [Mateusz Świerczyński](https://github.com/MatiSwierczynski) - @MatiSwierczynski

## Similar packages

- https://github.com/obytes/react-native-template-obytes
- https://github.com/infinitered/ignite
- https://github.com/wataru-maeda/react-native-boilerplate

### Outdated (not maintained anymore)

- https://github.com/kacgrzes/expo-typescript-template (our repo is fork of this one - we keep maintaining this)
- https://github.com/codingki/react-native-expo-template
- https://github.com/flatlogic/react-native-starter
- https://github.com/mcnamee/react-native-expo-starter-kit
