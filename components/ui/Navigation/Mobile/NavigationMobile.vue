<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import ColorMode from '~/components/ui/ColorMode/ColorMode.vue'

const isOpen = ref(false)
function handleClick() {
  console.log('clicked')
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="flex justify-center space-x-2">
    <ColorMode />
    <button>
      <Icon
        class="h-10 w-10 color-pureBlack transition-transform duration-700 ease-in-out dark:color-pureWhite"
        icon="ri:search-2-line"
        @click="handleClick"
      />
    </button>

    <button>
      <Icon
        :class="isOpen ? 'rotate-180' : ''"
        class="h-10 w-10 color-pureBlack transition-transform duration-700 ease-in-out dark:color-pureWhite"
        icon="ri:menu-3-line"
        @click="handleClick"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>

</style>
