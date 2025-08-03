export default defineNuxtPlugin(() => {
  const colorModeCookie = useCookie('color-mode', { default: () => 'light' })
  useState('color-mode', () => colorModeCookie.value)
})
