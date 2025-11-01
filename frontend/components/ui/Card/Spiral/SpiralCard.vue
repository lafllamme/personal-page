<script setup lang="ts">
interface BlogPost {
  id: number
  title: string
  date: string
  category: string
  imageUrl: string
}
// Accept a post prop so this component can be reused for each blog entry
defineProps<{ post: BlogPost }>()
</script>

<template>
  <div
    :class="useClsx(
      'color-pureBlack dark:color-pureWhite dark:border-pureWhite',
      'hover:shadow-black/50 dark:hover:shadow-white/50',
      'rounded-none h-[550px] w-[400px] flex flex-col',
      'overflow-hidden border border-pureBlack border-solid',
      'bg-sand-4 shadow-2xl transition-all duration-500',
    )"
  >
    <div class="p-6 pb-2">
      <p class="text-sm color-gray-11 tracking-widest uppercase">
        {{ post.category }}
      </p>
      <h3 class="mt-2 text-4xl font-extrabold leading-tight">
        {{ post.title }}
      </h3>
    </div>
    <div class="flex flex-grow flex-col justify-between p-6 pt-0">
      <div class="flex flex-grow items-center justify-center overflow-hidden">
        <!-- Placeholder for immersive image/visual -->
        <div class="bg-gray-100 dark:bg-gray-900 h-full w-full flex items-center justify-center">
          <span class="text-black/10 dark:text-white/10 text-8xl font-serif">
            {{ post.id }}
          </span>
        </div>
      </div>
      <!-- Horizontal separator -->
      <div class="bg-black dark:bg-white my-4 h-[1px] w-full" />
      <div class="flex items-center justify-between text-sm">
        <span class="font-mono">{{ post.date }}</span>
        <span class="text-lg font-bold">#{{ post.id }}</span>
      </div>
    </div>
  </div>
</template>
