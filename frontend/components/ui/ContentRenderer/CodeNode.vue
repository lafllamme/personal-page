<script setup lang="ts">
defineProps<{ node: any }>()
</script>

<template>
  <pre class="bg-gray-100 dark:bg-gray-800 my-4 overflow-x-auto rounded p-3">
    <code :class="`language-${node.language || ''}`">{{ node.code }}</code>
  </pre>
</template>
