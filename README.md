<p align="center">
    <img src="assets/logo/logo-light.png" alt="Logo">
</p>

# BACA - React Native Template

> **BACA** - **B**INAR **A**PPS **C**ORE **A**PPLICATION
>
> This repository is part of a whole ecosystem, and it only contains React Native code.

[![MIT License](https://img.shields.io/npm/l/@binarapps/baca-react-native-template?style=flat-square)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![NPM Version](https://img.shields.io/npm/v/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/v/@binarapps/baca-react-native-template?style=flat-square)
[![NPM Downloads](https://img.shields.io/npm/dt/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/dt/@binarapps/baca-react-native-template?style=flat-square)
[![GitHub Stars](https://img.shields.io/github/stars/binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/github/stars/binarapps/baca-react-native-template?style=flat-square)
[![Runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

## 🎉 Great React Native Boilerplate

This is a template for React Native and Expo. It includes all the necessary components to start working with the Expo framework. It has the most popular packages included, making it easier to start coding the app itself without the usual boilerplate setup.

## 📖 [Documentation](https://baca-docs.vercel.app/docs/overview)

Check out our [documentation page](https://baca-docs.vercel.app/docs/overview). It contains:

- Bootstrapping the project
  - Tutorial on easy setup from scratch
- Building the app
- Deploying the app
- Tutorials on:
  - Managing environment variables
  - Using Jotai as a state management tool
  - And many more tutorials

## 🏆 Why Use BACA?

While there are many project starters for React Native, we offer features that are often missing in other starters:

- **Works seamlessly with EXPO GO**
  - Ideal for starting a project; switch to expo-dev-client later.
- **Supports WEB**
  - Perfect for developing apps for both web and mobile platforms.
- **Code Generators**
  - Easily create new screens, components, and more.
- **Fully Typed**
  - Ensures robust code quality.
- **Comprehensive App Deployment Documentation**

## 🔍 How It Looks?

- [Web demo app](https://baca-six.vercel.app)
- [Video](https://www.youtube.com/watch?v=NmTd5nXXTLI)

## 🚀 How to Use?

We have prepared detailed documentation on how to run the project with this template - **[Bootstrap docs](https://baca-docs.vercel.app/docs/overview)**.

It's great for production projects, but if you want to just test it, you can follow these quick steps:

### 🏃‍♂️ Quick Steps

```
npx create-expo-app --template=@binarapps/baca-react-native-template name_of_your_app
cd name_of_your_app
yarn bootstrap # The CLI will ask you some questions about your app (you can fill in this data later).
```

## 📦 What's Inside?

[![TypeScript](https://img.shields.io/npm/types/@binarapps/baca-react-native-template?style=flat-square)](https://img.shields.io/npm/types/@binarapps/baca-react-native-template?style=flat-square)
[![Expo Version](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/expo?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/expo?style=flat-square)
[![React Navigation](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/@react-navigation/native?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/@react-navigation/native?style=flat-square)

### Custom Features

- **Custom CLI**
  - Run `yarn baca` to see available options.
- **Generators**
  - `yarn baca generate` | `yarn g`
- **Support for Multiple Environments**
  - Production, staging, QA
- **EAS Configuration**
  - Update, build, submit
- **Deployment Documentation**
  - [Deployment docs](https://baca-docs.vercel.app/docs/overview)
- **Code Verification on Pull Requests**
  - Tests, linters, and type checks on GitHub pull requests.
- **Custom Fonts**
  - Load fonts and all assets.
- **Dark/Light Theme Support**
  - Color scheme detection and toggle.
- **Navigation**
  - Prevent go back (useful for forms).
- **Auth Flow Ready for Implementation**
  - Uses expo-secure-store for user token storage.
  - Fully functional signIn/signOut logic based on BACA backend.
- **Animations with `reanimated` and `moti`**

### Libraries

- **TypeScript**
  - Fully typed app.
- **Expo v50**
- **Expo Router**
- **Prettier and Eslint**
  - Code formatting and checking.
- **Babel-Module-Resolver**
  - Unified imports.
- **Jest and @testing-library/react-native**
  - Unit tests.
- **i18next**
  - Translations and language detection.
- `@gorhom/bottom-sheet`
- **Expo-Notifications**
  - [Configuration guide](https://baca-docs.vercel.app/docs/expo-notifications)
- **Reactotron**
  - Debugging.
- **Reanimated**
- **Axios + React Query**
  - Data fetching.
- **Jotai**
  - State management.

## 🔜 Future Plans

- Tutorials on using features:
  - Navigation, deep linking, auth flows, components.
- Add possibility to easyli change backend service
  - Right now our app is deeply connected to
- Add designs (Figma) and redesign the app.
- Update Expo versions.
- Document deployment to App Store and Play Store.
- Improve mock server logic.
- Add commit lint.
- Additional libraries:
  - [expo-image](https://github.com/expo/expo/tree/main/packages/expo-image)
  - [FlashList](https://github.com/Shopify/flash-list)
  - [ZOD](https://github.com/colinhacks/zod)

## 👏 How to Contribute

Contributions are always welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for ways to get started.

Please adhere to this project's code of conduct.

## 🤙 How to Run Locally

Clone the project:

```
git clone https://github.com/binarapps/baca-react-native-template.git
```

Go to the project directory:

```
cd baca-react-native-template
```

Install dependencies:

```
yarn
```

Start the Expo server:

```
yarn start
```

Environment variables instruction:

1. Create an empty file `scripts/doppler_variables.sh` and add this script to the newly created file.

- Run `yarn prepare:env_file` - This will copy the template and place it in `scripts/doppler_variables.sh`.

2. Add correct values to variables (ask one of the developers for that), example:

```
export DOPPLER_TOKEN_DEVELOPMENT=dp.st.alpha.XXXXxxxxXXXXxxxxXXXXxxxx
```

Start the Expo server:

```
yarn start
```

## 📘 License

[MIT](https://choosealicense.com/licenses/mit/)

## 📝 Feedback

If you have any feedback, please reach out to me at mateusz.rostkowsky995@gmail.com.

## 👨‍👩‍👧‍👦 Contributors

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

## 📦 Similar packages

- Maintained
  - https://github.com/obytes/react-native-template-obytes
  - https://github.com/infinitered/ignite
  - https://github.com/wataru-maeda/react-native-boilerplate
- Outdated (not maintained anymore):
  - https://github.com/kacgrzes/expo-typescript-template (our repo is fork of this one - we keep maintaining this)
  - https://github.com/codingki/react-native-expo-template
  - https://github.com/flatlogic/react-native-starter
  - https://github.com/mcnamee/react-native-expo-starter-kit
