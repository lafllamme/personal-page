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
  <!-- Outer flex container -->
  <div class="w-full flex items-center">
    <!-- Left group (ColorMode, Search, Menu) -->
    <div class="flex flex-1 justify-center space-x-2">
      <ColorMode />
      <button>
        <Icon
          class="h-10 w-10 color-pureWhite transition-all duration-900 ease-in-out dark:color-pureBlack"
          icon="ri:search-2-line"
          @click="handleClick"
        />
      </button>
      <button>
        <Icon
          :class="isOpen ? 'rotate-180' : ''"
          class="h-10 w-10 color-pureWhite transition-all duration-900 ease-in-out dark:color-pureBlack"
          icon="ri:menu-3-line"
          @click="handleClick"
        />
      </button>
    </div>

    <!-- Right icon (World) -->
    <div class="flex justify-end">
      <Icon
        class="h-10 w-10 color-pureWhite transition-all duration-900 ease-in-out dark:color-pureBlack"
        icon="streamline:earth-1"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
