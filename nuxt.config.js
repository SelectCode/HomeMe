import colors from 'vuetify/es5/util/colors'

export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    server: {
        port: 8080
    },
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~/plugins/vuex-persist', ssr: false}
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxt/typescript-build',
        '@nuxtjs/vuetify',
        ['@nuxtjs/google-analytics', {
            id: 'UA-72893868-7'
        }]
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Doc: https://github.com/nuxt-community/dotenv-module
        '@nuxtjs/dotenv',
        '@nuxtjs/sentry',
        [
            'nuxt-netlify-http2-server-push',
            {
                // Specify relative path to the dist directory and its content type
                resources: [
                    { path: '**/*.js', as: 'script' },
                    { path: 'avatar/*.gif', as: 'image' },
                    { path: 'avatar/*.svg', as: 'image' },
                ]
            }
        ]
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: ''
    },
    sentry: {
        dsn: 'https://8ce6221d85ed438b849737c3ed1cfd46@sentry.selectcode.de/14',
        config: {}, // Additional config
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
