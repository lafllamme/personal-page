<script setup lang="ts">
import { computed, toRefs } from 'vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

const props = withDefaults(defineProps<{
  forId?: string
  label?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
}>(), {
  forId: '',
  label: '',
  hint: '',
  error: '',
  required: false,
  disabled: false,
})

const { forId, label, hint, error, required, disabled } = toRefs(props)
const hasError = computed(() => Boolean(error.value))
</script>

<template>
  <div class="grid gap-2">
    <label
      v-if="label"
      :for="forId || undefined"
      class="flex items-center gap-1"
    >
      <DsTypography as="span" role="meta" size="xs" uppercase>
        {{ label }}
      </DsTypography>
      <DsTypography
        v-if="required"
        as="span"
        role="meta"
        size="xs"
        :tone="hasError ? 'default' : 'muted'"
      >
        *
      </DsTypography>
    </label>

    <slot />

    <DsTypography
      v-if="error"
      as="p"
      role="meta"
      size="xs"
      class="text-[#b42318] dark:text-[#ff8a80]"
    >
      {{ error }}
    </DsTypography>

    <DsTypography
      v-else-if="hint"
      as="p"
      role="meta"
      size="xs"
      :tone="disabled ? 'muted' : 'default'"
      class="opacity-70"
    >
      {{ hint }}
    </DsTypography>
  </div>
</template>
