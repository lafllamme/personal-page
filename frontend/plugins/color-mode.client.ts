export default defineNuxtPlugin(() => {
  const colorModeCookie = useCookie('color-mode')
  useState('color-mode', () => colorModeCookie.value || 'light')
})
