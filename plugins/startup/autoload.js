import Vue from 'vue'
import { upperFirst, camelCase } from 'lodash'

const requireComponent = require.context(
  // The relative path of the components folder
  '~/components/bootstrap',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /Base[A-Z]\w+\.(vue|js)$/
)

export default () => {
  requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)
    const explodedName = fileName.split('/')
    const name = explodedName[explodedName.length - 1]

    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Strip the leading `./` and extension from the filename
        name.replace(/(.vue)/, '')
      )
    )

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    )
  })
}
