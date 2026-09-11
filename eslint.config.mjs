import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'max-lines': ['error', { max: 200 }],
  },
})
