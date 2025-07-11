import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  vue: true,
  typescript: true,
  eslintOptions: {
    rules: {
      'no-console': 'warn', // Example: Warn for console.log usage
      'vue/no-unused-vars': 'error', // Example: Error for unused Vue variables
    },
  },
})
