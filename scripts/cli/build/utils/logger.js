'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.logger = void 0
const LCERROR = '\x1b[31m%s\x1b[0m' //red
const LCWARN = '\x1b[33m%s\x1b[0m' //yellow
const LCINFO = '\x1b[36m%s\x1b[0m' //cyan
const LCSUCCESS = '\x1b[32m%s\x1b[0m' //green
exports.logger = {
  error: (message, ...optionalParams) => {
    console.error(LCERROR, message, ...optionalParams)
  },
  warn: (message, ...optionalParams) => {
    console.warn(LCWARN, message, ...optionalParams)
  },
  info: (message, ...optionalParams) => {
    console.info(LCINFO, message, ...optionalParams)
  },
  success: (message, ...optionalParams) => {
    console.info(LCSUCCESS, message, ...optionalParams)
  },
}
