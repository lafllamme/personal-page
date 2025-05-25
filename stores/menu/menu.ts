import { defineStore } from 'pinia'

export const useMenu = defineStore('menu', () => {
  // Open/close state
  const isOpen = ref(false)

  // Logging function
  function log(message: string) {
    const infoPrint = '[Menu Store] =>'
    consola.debug(`${infoPrint} ${message}`)
  }

  // TODO: Move the menu items to a separate file or API call
  const menuItems = [
    {
      id: 1,
      title: 'Technology',
      children: [
        { id: 11, title: 'Gadgets', to: '/demo' },
        { id: 12, title: 'Software', to: '/test' },
        { id: 13, title: 'AI & Machine Learning', to: '/old' },
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
    {
      id: 6,
      title: 'Contact',
    },
  ]
  const items = ref<any[]>(menuItems)

  // Menu items and search functionality
  const openItems = ref<any[]>([])
  const searchQuery = ref('')
  const lastOpened = ref<object | null>(null)

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

  function setLastOpened(item: object) {
    lastOpened.value = item
  }

  function clearLastOpened() {
    lastOpened.value = null
  }

  function handleLastOpened(state: 'set' | 'clear', openItem: object) {
    if (state === 'set' && typeof openItem !== 'undefined' && openItem) {
      setLastOpened(openItem)
      log(`Last opened item set to ${lastOpened.value}`)
    }
    else if (state === 'clear') {
      clearLastOpened()
      log('Last opened item cleared')
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
    log('Menu closed, search query cleared')
  }

  function resetMenuStates(timeout?: number, clearMenu = true) {
    const wait = new Promise(resolve => setTimeout(resolve, timeout || 300))
    wait.then(() => resetMenu(clearMenu))
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
