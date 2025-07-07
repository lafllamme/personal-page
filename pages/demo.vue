<script lang="ts" setup>
import ReviewMarquee from '@/components/ui/ReviewMarquee/ReviewMarquee.vue'

const { find } = useStrapi()
const response = await find('articles')

consola.debug('[Demo] Received response:', response.data)
</script>

<template>
  <div class="color-red-12">
    {{ response }}
  </div>
  <div class="bg-pureWhite dark:bg-pureBlack">
    <ReviewMarquee />
  </div>
</template>
