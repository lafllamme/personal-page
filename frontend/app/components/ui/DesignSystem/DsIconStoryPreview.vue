<script setup lang="ts">
const installedPackIcons = [
  {
    label: 'radix-icons',
    name: 'radix-icons:mixer-horizontal',
  },
  {
    label: 'lucide',
    name: 'lucide:arrow-up-right',
  },
  {
    label: 'ri',
    name: 'ri:arrow-right-line',
  },
  {
    label: 'uil',
    name: 'uil:arrow-right',
  },
] as const
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <span class="block text-$type-meta-xs color-$color-primary leading-none font-$font-meta opacity-70">
          Installed packs
        </span>
        <div class="flex flex-wrap items-center gap-8">
          <div
            v-for="entry in installedPackIcons"
            :key="entry.name"
            class="min-w-36 flex items-center gap-3"
          >
            <Icon :name="entry.name" class="size-5 shrink-0" />
            <span class="text-$type-meta-xs leading-none font-$font-meta">{{ entry.label }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <span class="block text-$type-meta-xs color-$color-primary leading-none font-$font-meta opacity-70">
          Global aliases
        </span>
        <div class="flex flex-wrap items-center gap-8">
          <div class="min-w-52 flex items-center gap-3">
            <Icon name="lucide:arrow-up-right" class="size-5 shrink-0" />
            <span class="text-$type-meta-xs leading-none font-$font-meta">Icon</span>
          </div>
          <div class="min-w-52 flex items-center gap-3">
            <NuxtIcon name="lucide:arrow-up-right" class="size-5 shrink-0" />
            <span class="text-$type-meta-xs leading-none font-$font-meta">NuxtIcon</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
