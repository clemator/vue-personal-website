module.exports = {
  // Headers of the page
  head: {
    title: 'Clemator\'s hideout',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Welcome to my hideout' }
    ],
    link: [
      // Provide global resources to every page (no loader executed, eg. use `css` property for SASS CSS files)
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // CSS file injection (ie. not creating <link> element but injecting content)
  css: [
    'animate.css'
  ],
  // Router options
  // @link https://nuxtjs.org/api/configuration-router/
  router: {
    base: '/',
    mode: 'history'
  },
  // Customize the progress bar color
  // (or provide the path of a component)
  loading: { color: '#3B8070' },
  // Mode property: for now only make client-side navigation
  // @link https://nuxtjs.org/api/configuration-mode/
  mode: 'spa',
  // Scripts that you want to run before instantiating the root vue.js application
  // (for now placing them within a `startup` folder seems the most convenient)
  plugins: [
    '~/plugins/startup/autoload.js',
    '~/plugins/startup/bootloader.js',
    '~/plugins/startup/use.js'
  ],
  // Scripts which can extend nuxt core functionality
  modules: [
    // If `.env` is available, it will inject each defined variable into the
    // the "env" property (it is best for local development, as you won't have to
    // set/edit your host server variables)
    // Priority env: dotenv file < nuxt.config.env < server/cli (w/ nuxt injection)
    // @link https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
   // your settings here
   scss: ['~/assets/scss/main.scss']
  },
  // "nuxt.config.env" set up: please refer to the above "dotenv" comment (in short
  // each line will allow the defined server/cli variable to be potentially
  // injected into the "env" property ; the default `null` assignement will allow
  // to perform a validation -> see "bootloader" plugin)
  // @link https://nuxtjs.org/api/configuration-env/
  env: {
    BACKEND_API_PROTOCOL: process.env.BACKEND_API_PROTOCOL || null,
    BACKEND_API_DOMAIN: process.env.BACKEND_API_DOMAIN || null,
    BACKEND_API_PATH: process.env.BACKEND_API_PATH || null,
    NODE_ENV: process.env.NODE_ENV || null,
  },
  // Build configuration
  // @link https://nuxtjs.org/api/configuration-build/
  build: {
    // Add modules inside the vendor.bundle.js file to reduce the size of
    // the application bundle
    // @link https://nuxtjs.org/api/configuration-build/#vendor
    vendor: [
      '~/plugins/fp',
      '~/plugins/loggers/console',
      '~/plugins/loggers/vuex',
    ],
    // Set analyze to `false`, if not it will trigger the analyzer on `nuxt start`
    // @link https://nuxtjs.org/api/configuration-build/#analyze
    analyze: false,
    /**
     * Webpack Config Extension
     *
     *    - "vuejs-modal": need the vue-compiler in order to render literal
     *      markup → we have to force nuxt.js to use the FULL build of VueJS
     *      (as Nuxt only use the 'runtime' version of VueJS)
     *        ↳ /!\ the imapct of using the full build should be taken into
     *              account, as the size of our bundle will increase by 30%
     * @param {Object} config
     */
    extend(config) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}