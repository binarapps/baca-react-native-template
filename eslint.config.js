const compat = require('@eslint/compat')
const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')
const prettier = require('eslint-plugin-prettier')
const react = require('eslint-plugin-react')
const reactNative = require('eslint-plugin-react-native')
const reactNativeGlobals = require('eslint-plugin-react-native-globals')

const flatCompatObject = new FlatCompat({
  recommendedConfig: js.configs.recommended, // optional unless using "eslint:recommended"
  allConfig: js.configs.all, // optional unless using "eslint:all"
})

module.exports = [
  ...compat.fixupConfigRules(
    flatCompatObject.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-native/all',
      'universe',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/jsx-runtime'
    )
  ),

  {
    files: ['src/**/*.tsx', 'src/**/*.ts', 'app/**/*.tsx', 'app/**/*.ts'],
    languageOptions: {
      globals: {
        ...reactNative.environments['react-native']['react-native'],
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
        files: ['src/**/*.tsx', 'src/**/*.ts', 'app/**/*.tsx', 'app/**/*.ts'],
      },
    },
    settings: {
      'import/ignore': ['react-native'],

      react: {
        version: 'detect',
      },
    },

    plugins: {
      '@typescript-eslint': compat.fixupPluginRules(typescriptEslint),
      prettier: compat.fixupPluginRules(prettier),
      'react-native-globals': reactNativeGlobals,
      react: compat.fixupPluginRules(react),
      'react-native': compat.fixupPluginRules(reactNative),
    },
    rules: {
      'no-redeclare': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],

      'react/jsx-no-bind': ['warn'],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/display-name': 'off',
      'react/prop-types': 'off',

      'react-native/no-single-element-style-arrays': 'off',
      'react-native/no-raw-text': [
        2,
        {
          skip: [
            'Text.LgBold',
            'Text.LgMedium',
            'Text.LgRegular',
            'Text.LgSemibold',
            'Text.MdBold',
            'Text.MdMedium',
            'Text.MdRegular',
            'Text.MdSemibold',
            'Text.SmBold',
            'Text.SmMedium',
            'Text.SmRegular',
            'Text.SmSemibold',
            'Text.XlBold',
            'Text.XlMedium',
            'Text.XlRegular',
            'Text.XlSemibold',
            'Text.XsBold',
            'Text.XsMedium',
            'Text.XsRegular',
            'Text.XsSemibold',

            'Display',
            'Display.LgBold',
            'Display.LgMedium',
            'Display.LgRegular',
            'Display.LgSemibold',
            'Display.MdBold',
            'Display.MdMedium',
            'Display.MdRegular',
            'Display.MdSemibold',
            'Display.SmBold',
            'Display.SmMedium',
            'Display.SmRegular',
            'Display.SmSemibold',
            'Display.XlBold',
            'Display.XlMedium',
            'Display.XlRegular',
            'Display.XlSemibold',
            'Display.XsBold',
            'Display.XsMedium',
            'Display.XsRegular',
            'Display.XsSemibold',

            'Button',
            'Button.Primary',
            'Button.PrimaryDestructive',
            'Button.SecondaryColor',
            'Button.SecondaryGray',
            'Button.SecondaryDestructive',
            'Button.TertiaryColor',
            'Button.TertiaryGray',
            'Button.TertiaryDestructive',
            'Button.LinkColor',
            'Button.LinkGray',
            'Button.LinkDestructive',
            'Heading',
            'Menu.Item',
          ],
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/*',
      'eslint.config.js',
      'scripts/**',
      'babel.config.js',
      'webpack.config.js',
      'docs/**',
      'scripts/cli/build/**',
    ],
  },
]
