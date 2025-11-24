<script lang="ts" setup>
import Link from '~/components/ui/Link/Link.vue'
import { useMenu } from '~/stores/menu'

// Store
const menuStore = useMenu()
const { items, openItems, showAccordion, lastOpened } = storeToRefs(menuStore)
const { toggleOpenItem, toggleMenu, handleLastOpened } = menuStore

// State
const contentRefs = ref<Record<number, HTMLElement | null>>({})

// --- Computed: Map parentId+childId => true if highlighted ---
const highlightedKey = computed(() => {
  if (!lastOpened.value)
    return ''
  return `${lastOpened.value.parentId}:${lastOpened.value.childId}`
})

// --- Handlers ---
function onToggleParent(id: number) {
  toggleOpenItem(id)
}

function onChildClick(item: any, child: any) {
  handleLastOpened('set', { parentId: item.id, childId: child.id })
  toggleMenu('toggle')
}

// --- Helper: is the child highlighted? ---
function isHighlighted(itemId: number, childId: number) {
  return highlightedKey.value === `${itemId}:${childId}`
}
</script>

<template>
  <TransitionGroup
    v-show="showAccordion"
    class="space-grotesk-regular antialiased space-y-0"
    name="list"
    tag="div"
  >
    <div v-for="(item, idx) in items" :key="item.id">
      <!-- Parent Button -->
      <button
        :id="`accordion-button-${item.id}`"
        :aria-controls="`accordion-content-${item.id}`"
        :aria-current="openItems.includes(item.id) ? 'true' : 'false'"
        :aria-expanded="openItems.includes(item.id)"
        :aria-label="item.title"
        :class="useClsx(
          'focus:outline-none focus-visible:bg-gray-5A rounded-full focus:color-jade-11 media-mouse:hover:color-jade-11',
          idx !== 0 && 'border-t border-solid border-gray-5 dark:border-gray-2',
          'group relative w-full flex items-center justify-between',
          'py-4 px-4 text-left text-4xl tracking-normal uppercase ',
          'color-pureBlack dark:color-pureWhite',
          'transition-colors duration-300 default-cursor',
        )"
        :tabindex="0"
        type="button"
        @click="item.children && onToggleParent(item.id)"
        @keydown.enter.prevent="item.children && onToggleParent(item.id)"
      >
        <span
          :class="useClsx(
            'group-focus:opacity-100 media-mouse:group-hover:opacity-100 group-focus-visible:!opacity-0',
            'group-focus:scale-y-100 media-mouse:group-hover:scale-y-100 group-focus-visible:!scale-y-0',
            'scale-y-50  bg-jade-11 opacity-0 transition-all duration-150',
            'will-change-opacity will-change-transform -translate-y-1/2',
            'group absolute left-0 top-1/2 h-8 w-1 rounded-full',
          )"
        />

        <div class="flex items-center space-x-3">
          <span
            :class="useClsx(
              'font-semibold tracking-wide transition-all duration-300',
              'group-focus:translate-x-3 media-mouse:group-hover:translate-x-3',
            )"
          >
            {{ item.title }}
          </span>
        </div>
        <Icon
          v-if="item.children"
          :class="useClsx(
            'group-hover:color-jade-11A',
            'transition-all duration-300',
            openItems.includes(item.id) ? 'rotate-45' : '',
          )"
          class="h-6 w-6 md:h-8 md:w-8"
          name="ri:add-large-fill"
        />
      </button>

      <!-- Accordion Panel (children links) -->
      <div
        v-show="item.children"
        :style="{
          height: openItems.includes(item.id)
            ? `${contentRefs[item.id]?.scrollHeight || 0}px`
            : '0px',
          transition: 'height 320ms cubic-bezier(0.4,0,0.2,1)',
        }"
        class="overflow-hidden"
      >
        <div
          :ref="el => (contentRefs[item.id] = el as HTMLElement)"
          class="animate-in px-4 pb-4 duration-300 slide-in-from-top-3 space-y-1"
          style="will-change: height, transform;"
        >
          <div
            v-for="child in item.children"
            :key="child.id"
          >
            <Link
              :aria-hidden="openItems.includes(item.id) ? 'false' : 'true'"
              :class="useClsx(
                'flex items-center space-x-3 group',
                'w-full text-left px-4 py-2.5 text-base',
                'text-gray-10 hover:text-gray-12 focus-visible:text-gray-12',
                'transition-colors duration-200 rounded-full',
                isHighlighted(item.id, child.id) && 'color-mint-11',
              )"
              :tabindex="openItems.includes(item.id) ? 0 : -1"
              :title="child.title"
              :to="child.to ?? '/demo'"
              @click="onChildClick(item, child)"
            >
              <Icon
                class="h-4 w-4 color-gray-6 transition-colors duration-200 group-focus-visible:color-mint-11 group-hover:color-mint-11"
                name="ri:arrow-right-line"
              />
              <span>{{ child.title }}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<style>
/* Animation for menu items */
.animate-in {
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}
</style>
