var description = '\
Здесь собрано множество тестов на самые различные темы. \
Проверяй себя, решай их или создавай свои. \
Хочешь опросить своих друзей, проверить знания учеников или просто изучить мнение посетителей сайта? \
Тогда тебе точно сюда!'

export default {
  head: {
    title: 'Tests for everyone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { property: 'og:title', content: 'Tests for everyone'},
      { property: 'og:type', content: 'website'},
      { property: 'og:image', content: 'http://testsforeveryone.ru/favicon.svg'},
      { property: 'og:description', content: description}
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap'}
    ]
  },

  css: [
  ],

  plugins: [
  	'~/plugins/axios',
    '~/plugins/auth',
    '~/plugins/components',
    '~/plugins/extclick'
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
              'faTrash', 'faEllipsisH', 'faSearch'],
      regular: ['faEdit', 'faStar', 'faHandPeace', 'faUser', 'faBell']
    }
  },

  loading: false
}
