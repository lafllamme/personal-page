<script lang="ts" setup>
import Link from '@/components/ui/Link/Link.vue'
import { useMenu } from '@/stores/menu'

const menuStore = useMenu()
const { items, openItems, showAccordion } = storeToRefs(menuStore)
const { toggleOpenItem, toggleMenu } = menuStore
const contentRefs = ref<Record<number, HTMLElement | null>>({})

function toggleItem(id: number) {
  toggleOpenItem(id)
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
      <button
        :class="useClsx(
          idx !== 0 && 'border-t border-solid border-gray-5 dark:border-gray-2',
          'group relative w-full flex items-center justify-between',
          'color-pureBlack dark:color-pureWhite',
          'py-4 px-4 text-left text-4xl tracking-normal uppercase hover:color-jade-11',
          'transition-colors duration-300 focus:outline-none focus:color-jade-11 focus-visible:bg-gray-5A rounded-full',
        )"
        @click="item.children && toggleItem(item.id)"
        @keydown.enter.prevent="item.children && toggleItem(item.id)"
      >
        <span
          class="group absolute left-0 top-1/2 h-8 w-1 scale-y-50 rounded-full bg-jade-11 opacity-0 transition-all duration-150 will-change-opacity will-change-transform -translate-y-1/2 group-focus:scale-y-100 group-hover:scale-y-100 group-focus:opacity-100 group-hover:opacity-100 group-focus-visible:!scale-y-0 group-focus-visible:!opacity-0"
        />

        <div class="flex items-center space-x-3">
          <span
            class="font-semibold tracking-wide transition-all duration-300 group-focus:translate-x-3 group-hover:translate-x-3"
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
          <div v-for="child in item.children" :key="child.id">
            <Link
              :aria-hidden="openItems.includes(item.id) ? 'false' : 'true'"
              :class="useClsx(
                'flex items-center space-x-3 group',
                'w-full text-left px-4 py-2.5 text-md',
                'text-gray-10 hover:text-gray-12 focus-visible:text-gray-12',
                'transition-all duration-200 rounded-full',
              )"
              :tabindex="openItems.includes(item.id) ? 0 : -1"
              :title="child.title"
              :to="child.to || '/demo'"
              @click="toggleMenu('toggle')"
            >
              <Icon
                class="h-4 w-4 text-gray-6 transition-colors duration-200 group-focus-visible:color-mint-11 group-hover:color-mint-11"
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
