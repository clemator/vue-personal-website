/**
 *  Bootloader triggered at application startup
 *
 *        - Automatically validating environment variables (cf. nuxt.config.js
 *          `env` property)
 */
import { flow, isEmpty, filter, size, values } from '~/plugins/fp'
import Logger from '~/plugins/loggers/console'

const console = new Logger({ callee: 'plugin:bootloader' })

export const ERRORS = {
  UNSET_VARIABLES: 'unset environment variables found'
}

export default ({ env }) => {
  console.log('Found environment variables', env)
  validateEnvironmentVariables(env)
}
/**
 *  Validate Environment Variables
 *  @param {object} env
 *  @throws {Error}
 */
function validateEnvironmentVariables(env) {
  let unsetVariablesCount = flow([
    values,
    filter(isEmpty),
    size
  ])(env)

  if (unsetVariablesCount)
    throw new Error(ERRORS.UNSET_VARIABLES)
}
