import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', () => {
  // Open/close state
  const isOpen = ref(false)

  // Header minimized state
  const isHeaderMinimized = ref(false)

  // Logging function
  function _log(message: string) {
    const infoPrint = '[Menu Store] =>'
    consola.debug(`${infoPrint} ${message}`)
  }

  // TODO: Move the menu items to a separate file or API call
  const menuItems = [
    {
      id: 1,
      title: 'Technology',
      children: [
        { id: 11, title: 'Articles', to: '/blog' },
        { id: 12, title: 'Software Solutions', to: '/test' },
        { id: 13, title: 'AI & Intelligent Systems', to: '/old' },
      ],
    },
    {
      id: 2,
      title: 'Business',
      children: [
        { id: 21, title: 'Startups' },
        { id: 22, title: 'Venture Capital' },
        { id: 23, title: 'Market Trends' },
      ],
    },
    {
      id: 3,
      title: 'Science',
      children: [
        { id: 31, title: 'Space' },
        { id: 32, title: 'Environment' },
        { id: 33, title: 'Health' },
      ],
    },
    {
      id: 4,
      title: 'Reviews',
      children: [
        { id: 41, title: 'Smartphones' },
        { id: 42, title: 'Laptops' },
        { id: 43, title: 'Wearables' },
      ],
    },
    {
      id: 5,
      title: 'About',
    },
  ]
  const items = ref<any[]>(menuItems)

  interface OpenSubItem {
    parentId: number
    childId?: number
  }

  // Menu items and search functionality
  const openItems = ref<any[]>([])
  const searchQuery = ref('')
  const lastOpened = ref<OpenSubItem | null>(null)

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

  function setLastOpened(item: OpenSubItem) {
    lastOpened.value = item
  }

  function clearLastOpened() {
    lastOpened.value = null
  }

  function handleLastOpened(state: 'set' | 'clear', openItem: OpenSubItem) {
    if (state === 'set' && typeof openItem !== 'undefined' && openItem) {
      setLastOpened(openItem)
    }
    else if (state === 'clear') {
      clearLastOpened()
    }
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

  function resetMenu(clearMenu: boolean) {
    if (clearMenu) {
      setOpenItems([])
    }
    searchQuery.value = ''
  }

  function resetMenuStates(timeout?: number, clearMenu = false) {
    const wait = new Promise(resolve => setTimeout(resolve, timeout || 300))
    wait.then(() => resetMenu(clearMenu))
  }

  function toggleMenu(state: 'open' | 'close' | 'toggle') {
    if (state === 'open') {
      openMenu()
    }
    else if (state === 'close') {
      closeMenu()
    }
    else if (state === 'toggle') {
      isOpen.value = !isOpen.value
    }
  }

  // Setter for header minimized state
  function setHeaderMinimized(minimized: boolean) {
    isHeaderMinimized.value = minimized
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

  watch(items, (v) => {
    consola.debug('[Menu Store] Items updated:', v)
  }, { immediate: true })

  watch(openItems, (v) => {
    consola.debug('[Menu Store] Open items updated:', v)
  })

  return {
    // Menu state
    isOpen,
    closeMenu,
    openMenu,
    toggleMenu,

    // Header state
    isHeaderMinimized,
    setHeaderMinimized,

    // Menu items
    items,
    setItems,
    openItems,
    setOpenItems,
    handleLastOpened,
    lastOpened,
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
