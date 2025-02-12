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
        :class="useClsx(
          'block select-none rounded-[6px] p-3 outline-none transition-colors',
          'text-[15px] leading-none no-underline',
          'hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-mint-7',
        )"
        v-bind="$attrs"
      >
        <div :class="useClsx('mb-[5px] text-mint-12 font-medium leading-[1.2]')">
          {{ title }}
        </div>
        <p :class="useClsx('my-0 text-mauve11 leading-[1.4]')">
          <slot />
        </p>
      </a>
    </NavigationMenuLink>
  </li>
</template>
