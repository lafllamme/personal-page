<script lang="ts" setup>
import type { Transition, Variant } from 'motion-v'
import { Motion } from 'motion-v'

const props = withDefaults(defineProps<CircularTextProps>(), {
  duration: 10,
  radius: 5,
})

const { duration, radius, transition, reverse, text, variants, class: className } = toRefs(props)

const BASE_TRANSITION = {
  repeat: Infinity,
  ease: 'linear',
}

const BASE_ITEM_VARIANTS: Record<string, any> = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

interface CircularTextProps {
  text: string
  duration?: number
  class?: string
  reverse?: boolean
  radius?: number
  transition?: Transition
  variants?: {
    container?: Variant
    item?: Variant
  }
}

const letters = computed(() => {
  const letters = text.value.split('')
  letters.push(' ')
  return letters
})
const finalTransition = computed<Transition | undefined>(() => ({
  ...(BASE_TRANSITION as any),
  ...(transition.value as any),
  duration: (transition.value?.duration as number | undefined) ?? duration.value,
}))

const containerVariants = computed(() => ({
  visible: { rotate: reverse.value ? -360 : 360 },
  // ...props.variants?.container,
}))

const itemVariants = computed<Record<string, any>>(() => ({
  hidden: { ...BASE_ITEM_VARIANTS.hidden, ...(variants.value?.item as any)?.hidden || {} },
  visible: { ...BASE_ITEM_VARIANTS.visible, ...(variants.value?.item as any)?.visible || {} },
}))
</script>

<template>
  <Motion
    :class="useClsx('relative tracking-widest', className)"
    :transition="finalTransition"
    :variants="containerVariants"
    animate="visible"
    as="div"
    initial="hidden"
  >
    <Motion
      v-for="(letter, index) in letters"
      :key="`${letter}-${index}`"
      :style="{
        '--index': index,
        '--total': letters.length,
        '--radius': radius,
        'transform': `
      translate(-50%, -50%)
      rotate(calc(360deg / var(--total) * var(--index)))
      translateY(calc(var(--radius, 5) * -1ch))
    `,
        'transformOrigin': 'center',
      }"
      :variants="itemVariants"
      class="absolute left-1/2 top-1/2 will-change-transform"
    >
      {{ letter }}
    </Motion>
  </Motion>
</template>

<style scoped></style>
