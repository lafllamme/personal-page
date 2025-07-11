<script lang="ts" setup>
import type { UnderlineProps } from '@/components/ui/Menu/Underline/Underline.model'
import { UnderlinePropsDefaults } from '@/components/ui/Menu/Underline/Underline.model'

const props = withDefaults(defineProps<UnderlineProps>(), UnderlinePropsDefaults)
const { className, color, variant, size } = props

/* ------------------------------------------------------------------ */
// 1.  For every size list the exact growth rules
const sizeRules: Record<'default' | 'big' | 'full', string[]> = {
  default: [
    /* pointer hover – peer & group versions */
    'media-mouse:peer-[&:hover:not(:focus-visible)]:w-3/4',
    'media-mouse:group-[&:hover:not(:focus-visible)]:w-3/4',

    /* mouse/touch focus (focus without focus-visible & without hover) */
    'peer-[&:focus:not(:focus-visible):not(:hover)]:w-3/4',
    'group-[&:focus:not(:focus-visible):not(:hover)]:w-3/4',
  ],

  full: [
    /* pointer hover */
    'media-mouse:peer-[&:hover:not(:focus-visible)]:w-4/4',
    'media-mouse:group-[&:hover:not(:focus-visible)]:w-4/4',

    /* mouse/touch focus */
    'peer-[&:focus:not(:focus-visible):not(:hover)]:w-4/4',
    'group-[&:focus:not(:focus-visible):not(:hover)]:w-4/4',
  ],

  big: [
    /* pointer hover */
    'media-mouse:peer-[&:hover:not(:focus-visible)]:w-6/5',
    'media-mouse:group-[&:hover:not(:focus-visible)]:w-6/5',

    /* mouse/touch focus */
    'peer-[&:focus:not(:focus-visible):not(:hover)]:w-6/5',
    'group-[&:focus:not(:focus-visible):not(:hover)]:w-6/5',
  ],
}

/* ------------------------------------------------------------------ */
// 2.  Pick the rule set for the requested size
const growRules = sizeRules[size] ?? sizeRules.default

/* ------------------------------------------------------------------ */
// 3.  Final class list
const underlineClasses = computed(() =>
  useClsx(
    color || 'bg-mint-8',
    'absolute bottom-0 h-[2px] w-0 transition-all duration-300',
    ...growRules, // ← spread them
    variant === 'left' ? 'left-0' : 'left-1/2 -translate-x-1/2',
    className,
  ),
)
</script>

<template>
  <span :class="underlineClasses" />
</template>
