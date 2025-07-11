<script lang="ts" setup>
const { data: posts } = await useAsyncData(() => {
  return queryCollection('content').path('/').first()
})

consola.debug('[Blog] Received posts:', posts.value)

useSeoMeta(
  {
    title: posts.value?.title,
    description: posts.value?.description,
  },
)
</script>

<template>
  <ContentRenderer v-if="posts" :value="posts" />
  <div v-else>
    Posts not found
  </div>
</template>
