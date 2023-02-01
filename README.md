![Logo](assets/logo.png)

[![MIT License](https://img.shields.io/npm/l/@binarapps/expo-ts-template?style=flat-square)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/npm/v/@binarapps/expo-ts-template?style=flat-square)](https://img.shields.io/npm/v/@binarapps/expo-ts-template?style=flat-square)
[![MIT License](https://img.shields.io/npm/dt/@binarapps/expo-ts-template?style=flat-square)](https://img.shields.io/npm/dt/@binarapps/expo-ts-template?style=flat-square)
[![MIT License](https://img.shields.io/github/stars/binarapps/expo-ts-template?style=flat-square)](https://img.shields.io/github/stars/binarapps/expo-ts-template?style=flat-square)

# @binarapps/expo-ts-template

This is a template to be used with expo. It includes all the necessary stuff to start working with expo framework. It has the most popular packages included, so it's easier to start coding the app itself without all the necessary boilerplate setup. It has:

Version in the `package.json` is one to one the latest expo on which the template was tested.

## Usage

There are two types of usage:

1. Init using this command

```bash
expo init --template=@binarapps/expo-ts-template name_of_your_app
```

2. Use this as template repo on GitHub
   ![Github Repository Template](assets/github-repository-template.png)

## Features

[![MIT License](https://img.shields.io/npm/types/@binarapps/expo-ts-template?style=flat-square)](https://img.shields.io/npm/types/@binarapps/expo-ts-template?style=flat-square)
[![MIT License](https://img.shields.io/github/package-json/dependency-version/binarapps/expo-ts-template/expo?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/expo-ts-template/expo?style=flat-square)
[![MIT License](https://img.shields.io/github/package-json/dependency-version/binarapps/expo-ts-template/@react-navigation/native?style=flat-square)](https://img.shields.io/github/package-json/dependency-version/binarapps/expo-ts-template/@react-navigation/native?style=flat-square)

- TypeScript support
- Expo
- React Navigation
  - with dark and light theme set up
  - with screen tracking hook
  - state persistence on development mode
  - prevent go back (to be used on forms for example)
- native-base
- color scheme detection (dark / light mode toggle)
- hermes enabled on Android by default
- i18next with translations, language detection and translations
- wait to load fonts and all the assets
- auth flow ready for implementation details
  - using expo-secure-store module to save user token
  - right now it has simple signIn/signOut flow
- prettier
- babel-module-resolver
- tests with jest and @testing-library/react-native
- animations with `reanimated` and `moti`
- `@gorhom/bottom-sheet`
- Reactotron
- expo-notifications (You can read how to configure them [here](/NOTIFICATIONS_SETUP.MD))

See all the details in the documentation.

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Working with designer in your project

Expo template, you are going to use - bundles native-base ui lib out of the box.
To have the best starting experience in your project - write a dm to your designer that they should use [NativeBase Figma Design Kit](https://www.figma.com/community/file/1050753649783931446)

<!--
  TODO: add documentation
  ## Documentation
  [Documentation](https://linktodocumentation)
-->

## Demo

Insert gif or link to demo

## Roadmap

- Additional browser support
- Add more integrations

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Run Locally

Clone the project

```bash
  git clone https://github.com/binarapps/expo-ts-template.git
```

Go to the project directory

```bash
  cd expo-typescript-template
```

Install dependencies

```bash
  yarn
```

Start the expo server

```bash
  yarn start
```

## Icons

This template uses [Remix icon set](https://remixicon.com/)

It is added to the app as a font generated by [icomoon app](https://icomoon.io/app/#/select).

## Adding new icons

1. Find `assets/icomoon/selection.json` file in your machine
2. Import this file to this [page (icomoon app)](https://icomoon.io/app/#/select):

- Make sure there are no other icons imported there

3. Download icon which need to be added to the app as svg file.
4. Make sure new icon name is unique (already not used).
5. Add svg file to icomoon app.
6. Go to generate font tab - icomoon app.

- Make sure that all icons that you have added have correct names

7. Download font - icomoon app
8. Replace old files with downloaded ones

- ./selection.json => assets/icomoon/selection.json
- ./fonts/icomoon.ttf => assets/icomoon/icomoon.ttf

9. Generate new types for icons

- run script generating icon types `yarn generate:icon:types`

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please reach out to me at kacgrzes@gmail.com

## Contributors

- [Kacper Grzeszczyk](https://www.github.com/kacgrzes) - @kacgrzes
- [Mateusz Rostkowski](https://www.github.com/MateuszRostkowski) - @MateuszRostkowski
- [Michał Szalowski](https://www.github.com/MSzalowski) - @MSzalowski
- [Jakub Zagórski](https://www.github.com/zagoorland) - @zagoorland
- [Łukasz Patalan](https://github.com/lukasz-patalan) - @lukasz
- [Mario Gliwa](https://github.com/mario688) - @mario688
- [Michał Baumruck](https://github.com/micbaumr) - @micbaumr
- [Andrzej Zaborski](https://github.com/AnMiZa) - @AnMiZa
