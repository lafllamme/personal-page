<script lang="ts" setup>
defineProps<{
  items: Array<{ label: string, href: string }>
  isOpen: boolean
}>()
</script>

<template>
  <div class="relative">
    <!-- Use transform for the entire nav element -->
    <nav
      :class="useClsx(
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'color-pureBlack dark:color-pureWhite dark:bg-black dark:text-white shadow-lg',
        'fixed left-0 top-0 z-40 h-screen  transform  pt-4 transition-all duration-300 ease-out',
        'w-56 lg:w-72 md:w-64 bg-gray-1',
      )"
    >
      <ul v-if="isOpen" class="z-40">
        <li
          v-for="(item, index) in items"
          :key="item.label"
          :class="useClsx('animate-fade-in !duration-900 ease-in-out')"
        >
          <a
            :href="item.href"
            class="hover:text-gray-600 dark:hover:text-gray-300 block p-4 transition-transform duration-200 hover:translate-x-1 hover:shadow-pureBlack/10 hover:shadow-sm dark:hover:shadow-pureWhite/10"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
