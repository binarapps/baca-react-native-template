'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generate = void 0
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const select_prompt_1 = __importDefault(require('select-prompt'))
const generateIconTypes_1 = require('../commands/generateIconTypes')
const generatePrompts = [
  {
    title: 'Screen',
    value: 'screen',
  },
  {
    title: 'Component',
    value: 'component',
  },
  {
    title: 'Icon types',
    value: 'icon-types',
  },
]
const commands = {
  screen: () => {
    console.log('Generate Screen')
  },
  component: () => {
    console.log('Generate Component')
  },
  'icon-types': generateIconTypes_1.generateIconTypes,
}
const generate = () => {
  ;(0, select_prompt_1.default)('What do you want to generate?', generatePrompts).on(
    'submit',
    (value) =>
      __awaiter(void 0, void 0, void 0, function* () {
        commands[value]()
      })
  )
}
exports.generate = generate
