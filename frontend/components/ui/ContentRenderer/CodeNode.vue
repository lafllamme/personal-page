<template>
  <pre class="bg-gray-100 dark:bg-gray-800 rounded p-3 overflow-x-auto my-4">
    <code :class="`language-${node.language || ''}`">{{ node.code }}</code>
  </pre>
</template>
<script setup lang="ts">
const props = defineProps<{ node: any }>()
</script> 