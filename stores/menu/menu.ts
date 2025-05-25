import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', () => {
  const isOpen = ref(false)
  const items = ref<any[]>([]) // Replace any[] with your MenuItem[] type!
  const searchQuery = ref('')

  function setItems(newItems: any[]) {
    items.value = newItems
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  const searchResults = computed(() => {
    if (!searchQuery.value.trim())
      return null
    const q = searchQuery.value.toLowerCase().trim()
    const results: any[] = []
    items.value.forEach((item) => {
      if (item.title.toLowerCase().includes(q)) {
        results.push({ ...item, _type: 'parent' })
        return
      }
      if (item.children && item.children.length) {
        const matchingChildren = item
          .children
          ?.filter((child: { title: string }) =>
            child.title.toLowerCase().includes(q),
          )
        if (matchingChildren.length) {
          results.push({
            ...item,
            children: matchingChildren,
            _type: 'children',
          })
        }
      }
    })
    return results
  })

  const showResults = computed(() => !!searchQuery.value && !!searchResults.value && searchResults.value.length > 0)
  const showNoResults = computed(() => !!searchQuery.value && (!searchResults.value || searchResults.value.length === 0))

  function highlightText(text: string, query: string) {
    if (!query.trim())
      return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part) => {
      if (regex.test(part)) {
        return `<mark class="bg-mint-5/30 text-jade-11 rounded px-1">${part}</mark>`
      }
      return part
    }).join('')
  }

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
    // menu state
    isOpen,
    closeMenu,
    openMenu,
    toggleMenu,
    // menu items & search
    items,
    setItems,
    searchQuery,
    setSearchQuery,
    searchResults,
    showResults,
    showNoResults,
    highlightText,
  }
})
