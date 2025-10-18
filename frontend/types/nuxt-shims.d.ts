declare module '#imports' {
  export const useLocalePath: any
  export const useHead: any
  export const useRequestEvent: any
}

declare module '#app/nuxt' {
  const NuxtApp: any
  export default NuxtApp
  export const useNuxtApp: any
}
