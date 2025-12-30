export default defineNuxtPlugin(() => {
  const colorModeCookie = useCookie('color-mode', { default: () => 'dark' })
  useState('color-mode', () => colorModeCookie.value)
})
