import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', () => {
  const isOpen = ref(false)

  function log(message: string) {
    const infoPrint = '[Menu Store] =>'
    consola.debug(`${infoPrint} ${message}`)
  }

  function closeMenu() {
    isOpen.value = false
  }

  function openMenu() {
    isOpen.value = true
  }

  function toggleMenu(state: 'open' | 'close') {
    if (state === 'open') {
      openMenu()
      log('Menu opened')
    }
    else if (state === 'close') {
      closeMenu()
      log('Menu closed')
    }
  }

  return {
    isOpen,
    closeMenu,
    openMenu,
    toggleMenu,
  }
})
