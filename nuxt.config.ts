// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  buildModules: [
    '@nuxtjs/date-fns',
  ],
    modules: [
        '@nuxtjs/tailwindcss',
      ],
      tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: false,
        exposeLevel: 2,
        injectPosition: 'first',
        viewer: true,
      }
})