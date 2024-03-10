const LCERROR = '\x1b[31m%s\x1b[0m' //red
const LCWARN = '\x1b[33m%s\x1b[0m' //yellow
const LCINFO = '\x1b[36m%s\x1b[0m' //cyan
const LCSUCCESS = '\x1b[32m%s\x1b[0m' //green

export const logger = {
  error: (message: string, ...optionalParams: unknown[]) => {
    console.error(LCERROR, message, ...optionalParams)
  },
  warn: (message: string, ...optionalParams: unknown[]) => {
    console.warn(LCWARN, message, ...optionalParams)
  },
  info: (message: string, ...optionalParams: unknown[]) => {
    console.info(LCINFO, message, ...optionalParams)
  },
  success: (message: string, ...optionalParams: unknown[]) => {
    console.info(LCSUCCESS, message, ...optionalParams)
  },
}
