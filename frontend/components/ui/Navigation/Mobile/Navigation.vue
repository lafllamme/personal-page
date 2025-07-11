<script lang="ts" setup>
// Import utilities from Vue and VueUse
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref, toRefs } from 'vue'

interface MenuItem {
  label: string
  href: string
  children?: MenuItem[]
}

const props = defineProps<{
  items: MenuItem[]
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close', value: boolean): void
  (e: 'opened'): void
  (e: 'closed'): void
}>()

const { isOpen } = toRefs(props)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerMD = computed(() => breakpoints.smaller('md').value)

// Common transition settings must match the Header component
const transitionDuration = 'duration-900'
const transitionEasing = 'ease-[cubic-bezier(0.77,0,0.18,1)]'
const transitionClasses = `transition-all ${transitionDuration} ${transitionEasing}`

const navBgClass = computed(() =>
  isOpen.value ? 'bg-pureWhite/95 dark:bg-pureBlack/95' : 'bg-pureWhite/50 dark:bg-pureBlack/50',
)

const expandedItems = ref<Set<string>>(new Set())

function toggleAccordion(label: string, event: Event) {
  event.preventDefault()
  event.stopPropagation()
  if (expandedItems.value.has(label)) {
    expandedItems.value.delete(label)
  }
  else {
    expandedItems.value.add(label)
  }
}

function isExpanded(label: string) {
  return expandedItems.value.has(label)
}

function getAnimationDelay(index: number) {
  return `${index * 100}ms`
}

function handleClick() {
  emit('close', false)
}

function onAfterEnter() {
  emit('opened')
}

function onAfterLeave() {
  emit('closed')
}
</script>

<template>
  <!-- Transition container for the mobile navigation.
       The transition animates opacity and max-height for a smooth slide-down effect.
       We use after-enter/after-leave hooks to signal the parent (Header.vue) when the transition ends. -->
  <Transition
    enter-active-class="transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    enter-from-class="opacity-0 max-h-0"
    enter-to-class="opacity-100 max-h-[400px]"
    leave-active-class="transition-all duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]"
    leave-from-class="opacity-100 max-h-[400px]"
    leave-to-class="opacity-0 max-h-0"
    @after-enter="onAfterEnter"
    @after-leave="onAfterLeave"
  >
    <div
      v-show="isOpen"
      :class="[navBgClass, transitionClasses]"
      class="overflow-hidden shadow-lg backdrop-blur-[8px] backdrop-saturate-150"
    >
      <ul class="m-0 list-none p-0">
        <li
          v-for="(item, index) in items"
          :key="item.label"
          :style="{ animationDelay: getAnimationDelay(index) }"
          class="animate-fade-down opacity-0"
        >
          <div
            :class="useClsx(
              'color-pureBlack dark:color-pureWhite hover:bg-gray-5',
              'mx-2 my-1 flex items-center justify-between rounded-lg px-5 py-3',
              'ease-in-out duration-300 transition-all cursor-pointer',
              isExpanded(item.label) && 'bg-gray-5',
            )"
            @click="item.children ? toggleAccordion(item.label, $event) : handleClick()"
          >
            <template v-if="!item.children">
              <a
                :href="item.href"
                class="w-full decoration-none"
                @click="handleClick"
              >
                {{ item.label }}
              </a>
            </template>
            <template v-else>
              <span>{{ item.label }}</span>
              <Icon
                :class="{ 'transform rotate-180': isExpanded(item.label) }"
                class="h-6 w-6" name="ri:arrow-down-s-line"
              />
            </template>
          </div>
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-96"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-96"
            leave-to-class="opacity-0 max-h-0"
          >
            <div v-if="item.children && isExpanded(item.label)" class="overflow-hidden">
              <div
                :class="useClsx(
                  'bg-gray-3 grid grid-cols-1',
                  'mx-2 mb-2 gap-4 rounded-lg px-5 py-3 md:grid-cols-3',
                )"
              >
                <div>
                  <ul class="m-0 list-none p-0">
                    <li v-for="child in item.children" :key="child.label" class="mb-2">
                      <a
                        :href="child.href"
                        class="block rounded px-3 py-2 color-pureBlack decoration-none transition-colors hover:bg-gray-10 dark:color-pureWhite"
                        @click="handleClick"
                      >
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </div>
                <div class="col-span-2 hidden color-pureBlack md:block dark:color-pureWhite">
                  <div class="h-full flex flex-col rounded-lg bg-gray-3 p-4">
                    <h3 class="mb-2 text-lg font-medium">
                      Featured in {{ item.label }}
                    </h3>
                    <p class="mb-4">
                      Discover our top picks and latest additions.
                    </p>
                    <div class="grid grid-cols-2 mt-auto gap-3">
                      <div class="rounded p-3 shadow-sm">
                        <div class="mb-2 h-24 w-full rounded bg-gray-2" />
                        <p class="font-medium">
                          Featured Item
                        </p>
                      </div>
                      <div class="rounded bg-gray-3 p-3 shadow-sm">
                        <div class="mb-2 h-24 w-full rounded bg-gray-2" />
                        <p class="font-medium">
                          Featured Item
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
@keyframes fade-down {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-down {
  animation: fade-down 0.9s forwards cubic-bezier(0.77, 0, 0.18, 1);
}
</style>
