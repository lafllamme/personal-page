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
      'h-[550px] w-[400px] flex flex-col',
      'overflow-hidden border border-pureBlack border-solid',
      'bg-sand-4 shadow-2xl transition-all duration-500',
      'rounded-tl-[48px] rounded-tr-[20px] rounded-br-[42px] rounded-bl-[18px]',
    )"
  >
    <div class="p-6 pb-2">
      <p class="font-manrope text-sm color-gray-11 font-light tracking-widest uppercase">
        {{ post.category }}
      </p>
      <h3 class="geist-regular mt-2 text-4xl font-bold leading-tight tracking-tight">
        {{ post.title }}
      </h3>
    </div>
    <div class="flex flex-grow flex-col justify-between p-6 pt-0">
      <div
        class="flex flex-grow items-center justify-center overflow-hidden rounded-bl-[9px] rounded-br-[21px] rounded-tl-[24px] rounded-tr-[10px]"
      >
        <!-- Placeholder for immersive image/visual -->
        <div class="h-full w-full flex items-center justify-center bg-sand-6">
          <span class="text-8xl color-gray-10 font-serif">
            {{ post.id }}
          </span>
        </div>
      </div>
      <!-- Horizontal separator -->
      <div class="my-4 h-[1px] w-full bg-pureBlack dark:bg-pureWhite" />
      <div class="flex items-center justify-between text-sm">
        <span class="font-mono">{{ post.date }}</span>
        <span class="text-lg font-bold">#{{ post.id }}</span>
      </div>
    </div>
  </div>
</template>
