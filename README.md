<p align="center">
    <img src="assets/logo/logo-light.png" alt="Logo">
</p>

# BACA - React Native Template

> **BACA** - **B**INAR **A**PPS **C**ORE **A**PPLICATION
>
> This repository is part of a whole ecosystem, and it only contains React Native code.

[![MIT License](https://img.shields.io/npm/l/@binarapps/baca-react-native-template?style=flat-square)](https://github.com/binarapps/baca-react-native-template/blob/master/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/@binarapps/baca-react-native-template?style=flat-square)](https://www.npmjs.com/package/@binarapps/baca-react-native-template)
[![NPM Downloads](https://img.shields.io/npm/dt/@binarapps/baca-react-native-template?style=flat-square)](https://www.npmjs.com/package/@binarapps/baca-react-native-template)
[![GitHub Stars](https://img.shields.io/github/stars/binarapps/baca-react-native-template?style=flat-square)](https://github.com/binarapps/baca-react-native-template/stargazers)
[![Runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

## 🔗 Quick Links

- **[Documentation](https://baca-docs.vercel.app/docs/overview)**:
  - Detailed guides on bootstrapping, building, and deploying your app.
- **[Demo](https://baca-six.vercel.app)**:
  - Check out the live web demo of the template.
- **[Video](https://youtu.be/Wt6Q1bOXIVQ)**
  - See quick preview on how it looks
- **[Examples](https://github.com/binarapps/baca-react-native-template/pulls?q=label%3Aexample)**:
  - Explore example implementations and use cases.
- **[BinarApps Company](https://binarapps.com)**:
  - Learn more about the team behind BACA.

## 📚 Table of Contents

- [🎉 Great React Native Boilerplate](#-great-react-native-boilerplate)
- [📖 Documentation](#-documentation)
- [🏆 Why Use BACA?](#-why-use-baca)
- [🔍 Preview](#-preview)
- [🚀 How to Use?](#-how-to-use)
  - [🏃‍♂️ Quick Steps](#️-quick-steps)
- [🛠 Prerequisites](#-prerequisites)
- [📦 What's Inside?](#-whats-inside)
  - [Libraries and Tools](#libraries-and-tools)
- [🔜 Future Plans](#-future-plans)
- [👏 How to Contribute](#-how-to-contribute)
  - [Steps to Contribute](#steps-to-contribute)
- [🤙 How to Run Locally](#-how-to-run-locally)
  - [Environment Variables Setup](#environment-variables-setup)
- [📘 License](#-license)
- [📝 Feedback](#-feedback)
- [👨‍👩‍👧‍👦 Contributors](#-contributors)
- [📦 Similar Packages](#-similar-packages)

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

BACA is designed to save you time and effort by providing a robust, production-ready template for React Native and Expo. Here's why you should choose BACA:

- **Works seamlessly with EXPO GO**
  - Ideal for starting a project; switch to expo-dev-client later.
- **Supports Web**
  - Perfect for developing apps for both web and mobile platforms.
- **Code Generators**
  - Easily create new screens, components, and more.
- **Fully Typed**
  - Ensures robust code quality.
- **Comprehensive App Deployment Documentation**
- **New architecture**
  - Works on new architecture of react native

## 🚀 How to Use?

We have prepared detailed documentation on how to run the project with this template - **[Bootstrap docs](https://baca-docs.vercel.app/docs/overview)**.

It's great for production projects, but if you want to just test it, you can follow these quick steps:

### 🏃‍♂️ Quick Steps

```bash
npx create-expo-app --template=@binarapps/baca-react-native-template name_of_your_app
cd name_of_your_app
yarn bootstrap

# The CLI will ask you some questions about your app (you can fill in this data later).

```

## 🛠 Prerequisites

Ensure you have the following installed before you begin:

- [Node.js](https://nodejs.org/en/) (v18+)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [yarn](https://classic.yarnpkg.com/en/docs/install)

Ideally it would be good to have finished [React Native Environment setup](https://reactnative.dev/docs/set-up-your-environment), check how to do it [here](https://reactnative.dev/docs/set-up-your-environment)

## 📦 What's Inside?

[![TypeScript](https://img.shields.io/npm/types/@binarapps/baca-react-native-template?style=flat-square)](https://www.npmjs.com/package/@binarapps/baca-react-native-template)
[![Expo Version](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/expo?style=flat-square)](https://github.com/binarapps/baca-react-native-template/blob/main/package.json)
[![React Navigation](https://img.shields.io/github/package-json/dependency-version/binarapps/baca-react-native-template/@react-navigation/native?style=flat-square)](https://github.com/binarapps/baca-react-native-template/blob/main/package.json)

### Libraries and Tools

- **TypeScript**: Strictly typed code for enhanced development experience.
- **Expo v52**: The latest Expo framework with modern React Native features.
- **Prettier and Eslint**: Automatically format and lint your code.
- **Babel-Module-Resolver**: Unified imports.
- **Jest and @testing-library/react-native**: Unit tests for React Native components.
- **i18next**: Simplifies internationalization and language support.
- **Axios + React Query**: Optimized data fetching and state management.
- **Jotai**: Minimalistic state management library.
- **Reanimated & Moti**: Smooth animations.
- **Reactotron**: Debugging and monitoring React Native apps.
- **Expo-Notifications**: Ready-to-use push notification handling.
- **Custom CLI**: `yarn baca` to access available options.

## 🔜 Future Plans

- Tutorials on using features like navigation, deep linking, theming and auth flows.
- Add the ability to easily switch backend services.
- Integrate Figma designs for a more cohesive UI/UX experience.
- Regular updates to Expo versions.
- Enhance documentation for App Store and Play Store deployment.
- Improve mock server logic.
- Add commit lint for consistent commits.
- Add support for libraries like `expo-image`, `FlashList`, and `ZOD`.
- Todos
  - Home screen
    - Add scripts - `yarn g` / `yarn b`
    - Add link to docs
    - Add link to examples
  - Settings screen redesign
  - finish ui docs

## 👏 How to Contribute

Contributions are always welcome!

### Steps to Contribute

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Run tests (`yarn test`) to ensure everything works.
5. Submit a pull request.

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for more details on contributing.

## 🤙 How to Run Locally

Clone the project:

```bash
git clone https://github.com/binarapps/baca-react-native-template.git
```

Go to the project directory:

```bash
cd baca-react-native-template
```

Install dependencies:

```bash
yarn
```

Start the Expo server:

```bash
yarn start
```

### Environment Variables Setup

1. Create an empty file `scripts/doppler_variables.sh` and add the following script:

```bash
export DOPPLER_TOKEN_DEVELOPMENT=dp.st.alpha.XXXXxxxxXXXXxxxxXXXXxxxx
```

2. Run `yarn prepare:env_file` to generate the environment variables template.

3. Add the correct values to `scripts/doppler_variables.sh` (ask a developer if needed).

## 📘 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 📝 Feedback

If you have any feedback, please reach out to [Mateusz Rostkowski](mailto:mateusz.rostkowsky995@gmail.com).

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

## 📦 Similar Packages

- Maintained:
  - [react-native-template-obytes](https://github.com/obytes/react-native-template-obytes)
  - [ignite](https://github.com/infinitered/ignite)
  - [react-native-boilerplate](https://github.com/wataru-maeda/react-native-boilerplate)
  - [start-ui](https://github.com/BearStudio/start-ui-web)
- Outdated:
  - [expo-typescript-template](https://github.com/kacgrzes/expo-typescript-template)
  - [react-native-expo-template](https://github.com/codingki/react-native-expo-template)
  - [react-native-starter](https://github.com/flatlogic/react-native-starter)
  - [react-native-expo-starter-kit](https://github.com/mcnamee/react-native-expo-starter-kit)
