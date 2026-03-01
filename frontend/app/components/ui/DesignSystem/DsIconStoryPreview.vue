<script setup lang="ts">
const installedPackIcons = [
  {
    label: 'iconoir (active)',
    name: 'iconoir:arrow-up-right',
  },
  {
    label: 'lucide (active)',
    name: 'lucide:arrow-up-right',
  },
  {
    label: 'radix-icons (legacy)',
    name: 'radix-icons:mixer-horizontal',
  },
  {
    label: 'ri (legacy)',
    name: 'ri:arrow-right-line',
  },
  {
    label: 'uil (legacy)',
    name: 'uil:arrow-right',
  },
] as const
</script>

<template>
  <div class="bg-pureWhite p-8 color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <span class="block text-$type-meta-xs color-$color-primary leading-none font-$font-meta opacity-70">
          Active + legacy packs
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
          Public API
        </span>
        <div class="flex flex-wrap items-center gap-8">
          <div class="min-w-52 flex items-center gap-3">
            <Icon name="lucide:arrow-up-right" class="size-5 shrink-0" />
            <span class="text-$type-meta-xs leading-none font-$font-meta">Icon</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
