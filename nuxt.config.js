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
        title: 'HomeMe - Home Office Begleiter',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {
                hid: 'description',
                name: 'description',
                content: 'HomeMe unterstützt Dich beim Einhalten von Pausen und sorgt für Abwechslung im Alltag!'
            }
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loadingIndicator: {
        name: 'three-bounce',
        color: '#1976d2',
        background: 'white'
    },
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
                    {path: '**/*.js', as: 'script'},
                    {path: 'avatar/*.gif', as: 'image'},
                    {path: 'avatar/*.svg', as: 'image'},
                ]
            }
        ],
        ['@nuxtjs/firebase',
            {
                config: {
                    apiKey: "AIzaSyD82tiYwRjyOyZ6ZTZKGVuSIVHFJIhhWDo",
                    authDomain: "homeme-selectcode.firebaseapp.com",
                    databaseURL: "https://homeme-selectcode.firebaseio.com",
                    projectId: "homeme-selectcode",
                    storageBucket: "homeme-selectcode.appspot.com",
                    messagingSenderId: "421716959991",
                    appId: "1:421716959991:web:380de2a9a15c6a640829f2",
                    measurementId: "G-Q6T9HPQXY9"
                },
                services: {
                    analytics: true,
                    performance: true,
                    firestore: true,
                    realtimeDb: true
                }
            }
        ]
    ],
    pwa: {
        meta: {
            name: 'HomeMe',
            author: 'SelectCode',
            description: 'HomeMe unterstützt Dich beim Einhalten von Pausen und sorgt für Abwechslung im Alltag!',
            theme_color: '#1976d2',
            lang: 'de'
        },
        manifest: {
            name: 'HomeMe',
            short_name: 'HomeMe',
            lang: 'de',
            description: 'HomeMe unterstützt Dich beim Einhalten von Pausen und sorgt für Abwechslung im Alltag!',
            theme_color: '#1976d2',
        }
    },
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
