<script setup lang="ts">
interface Props {
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    class="border-white/35 bg-white/12 dark:border-white/18 dark:bg-black/30 relative h-32 w-16 overflow-hidden border-2 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-3xl"
    @click="toggle"
  >
    <div class="from-white/5 absolute inset-0 to-transparent bg-gradient-to-b" />
    <div
      class="ease-spring absolute inset-0 flex items-center justify-center transition-transform duration-500"
      :style="{ transform: modelValue ? 'translateY(100%)' : 'translateY(0%)' }"
    >
      <div
        class="border-white/45 bg-white/25 dark:border-white/22 dark:bg-white/12 relative h-16 w-11 border-2 rounded-2xl shadow-xl backdrop-blur-xl"
      >
        <div class="from-white/20 absolute inset-2 rounded-xl to-transparent bg-gradient-to-b" />
      </div>
    </div>
    <div
      class="absolute bottom-3 left-1/2 h-2 w-2 rounded-full transition-all duration-300 -translate-x-1/2"
      :style="{
        backgroundColor: modelValue ? 'rgba(52, 211, 153, 1)' : 'rgba(161, 161, 170, 0.45)',
        boxShadow: modelValue ? '0 0 20px rgba(52,211,153,1), 0 0 8px rgba(52,211,153,0.5)' : 'none',
      }"
    />
  </button>
</template>

<style scoped>
.ease-spring {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>

