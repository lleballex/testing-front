export default {
  head: {
    title: 'Tests for everyone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap'}
    ]
  },

  css: [
  ],

  plugins: [
  	'~/plugins/axios',
    '~/plugins/auth',
    '~/plugins/blur',
    '~/plugins/components'
  ],

  buildModules: [
    '@nuxtjs/fontawesome'
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],

  axios: {
    baseURL: 'http://localhost:8000/api/'
  },

  router: {
    linkActiveClass: 'active'
  },

  fontawesome: {
    component: 'icon',
    icons: {
      solid: ['faPencilAlt', 'faTimes', 'faChevronUp', 'faChevronDown',
              'faChevronRight', 'faCheck', 'faPlus', 'faImage', 'faPen',
              'faTrash', 'faEllipsisH'],
      regular: ['faEdit', 'faStar']
    }
  }
}
