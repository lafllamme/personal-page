import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', () => {
  // Open/close state
  const isOpen = ref(false)

  // Logging function
  function log(message: string) {
    const infoPrint = '[Menu Store] =>'
    consola.debug(`${infoPrint} ${message}`)
  }

  // Menu items and search functionality
  const items = ref<any[]>([])
  const openItems = ref<any[]>([])
  const searchQuery = ref('')

  // Setters for items and search query
  function setItems(newItems: any[]) {
    items.value = newItems
  }

  function setOpenItems(ids: number[]) {
    openItems.value = ids
  }

  function toggleOpenItem(id: number) {
    openItems.value = openItems.value[0] === id ? [] : [id]
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  // Setter for menu open state
  function closeMenu() {
    isOpen.value = false
  }

  function openMenu() {
    isOpen.value = true
  }

  function resetMenu() {
    setOpenItems([])
    searchQuery.value = ''
    log('Menu closed, search query cleared')
  }

  function resetMenuStates(timeout?: number) {
    const wait = new Promise(resolve => setTimeout(resolve, timeout || 300))
    wait.then(() => resetMenu())
  }

  function toggleMenu(state: 'open' | 'close' | 'toggle') {
    if (state === 'open') {
      openMenu()
      log('Menu opened')
    }
    else if (state === 'close') {
      closeMenu()
      log('Menu closed')
    }
    else if (state === 'toggle') {
      isOpen.value = !isOpen.value
      log(`Menu toggled to ${isOpen.value ? 'open' : 'closed'}`)
    }
  }

  // Computed properties for search results
  const searchResults = computed(() => {
    // If search query is empty, return null
    if (!searchQuery.value.trim())
      return null

    // Otherwise, filter items based on search query
    const q = searchQuery.value.toLowerCase().trim()
    const results: any[] = []

    // Check each item for a match in title or children
    items.value.forEach((item) => {
      if (item.title.toLowerCase().includes(q)) {
        results.push({ ...item, _type: 'parent' })
        return
      }
      // If item has children, check them as well
      if (item.children && item.children.length) {
        const matchingChildren = item
          .children
          ?.filter((child: { title: string }) => child.title.toLowerCase().includes(q))
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
  const showAccordion = computed(() => !showResults.value && !showNoResults.value)

  // clear search query on menu close
  watch(isOpen, (open) => {
    if (!open) {
      resetMenuStates()
    }
  })

  return {
    // Menu state
    isOpen,
    closeMenu,
    openMenu,
    toggleMenu,

    // Menu items
    items,
    setItems,
    openItems,
    setOpenItems,
    toggleOpenItem,
    showAccordion,

    // Search functionality
    searchQuery,
    setSearchQuery,
    searchResults,
    showResults,
    showNoResults,
  }
})
