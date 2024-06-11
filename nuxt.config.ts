// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.png'
        }
      ]
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  image: {
    domains: ['images.unsplash.com'],
    alias: {
      unsplash: 'https://images.unsplash.com'
    }
  },
  colorMode: {
    preference: 'light'
  },
  modules: ['@nuxt/image', '@nuxt/ui']
})
