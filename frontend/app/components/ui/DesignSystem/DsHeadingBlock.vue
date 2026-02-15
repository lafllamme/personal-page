<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  kicker?: string
  title: string
  dek?: string
  meta?: string[]
  titleAs?: 'h1' | 'h2' | 'h3'
  titleSize?: 'xl' | '2xl' | '3xl'
}>(), {
  kicker: '',
  dek: '',
  meta: () => [],
  titleAs: 'h2',
  titleSize: '2xl',
})

const { kicker, title, dek, meta, titleAs, titleSize } = toRefs(props)
const hasMeta = computed(() => meta.value.length > 0)
</script>

<template>
  <header class="grid gap-3">
    <DsTypography
      v-if="kicker"
      as="p"
      role="meta"
      size="xs"
      tone="muted"
      uppercase
    >
      {{ kicker }}
    </DsTypography>

    <DsTypography
      :as="titleAs"
      role="headline"
      :size="titleSize"
      uppercase
    >
      {{ title }}
    </DsTypography>

    <DsTypography
      v-if="dek"
      as="p"
      role="body"
      size="md"
      tone="muted"
      class="max-w-3xl"
    >
      {{ dek }}
    </DsTypography>

    <div v-if="hasMeta" class="flex flex-wrap items-center gap-x-2 gap-y-1">
      <template v-for="(item, index) in meta" :key="`${item}-${index}`">
        <DsTypography as="span" role="meta" size="xs" tone="muted" uppercase>
          {{ item }}
        </DsTypography>
        <DsTypography v-if="index < meta.length - 1" as="span" role="meta" size="xs" tone="muted">
          /
        </DsTypography>
      </template>
    </div>
  </header>
</template>
