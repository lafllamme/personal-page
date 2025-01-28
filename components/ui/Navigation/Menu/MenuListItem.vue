<script lang="ts" setup>
import { NavigationMenuLink } from 'radix-vue'

defineProps({
  title: String,
})
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <a
        class="block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
        v-bind="$attrs"
      >
        <div class="mb-[5px] text-green12 font-medium leading-[1.2]">
          {{ title }}
        </div>
        <p class="my-0 text-mauve11 leading-[1.4]">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
