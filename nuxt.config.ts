// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@pinia/nuxt'],
  css: ['~/assets/scss/theme.scss', '~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "main" as *;',
          // modern sass API key: sass-embedded silently ignores the legacy
          // `includePaths` alias, leaving the SFC style compilations without
          // a load path to the hub.
          loadPaths: [
            fileURLToPath(new URL('./app/assets/scss', import.meta.url)),
          ],
        },
      },
    },
  },
})
