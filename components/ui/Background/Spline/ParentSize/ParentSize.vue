<!-- ParentSize.vue -->
<script lang="ts" setup>
import type { ParentSizeProps } from './ParentSize.model'
import { ParentSizeDefaultProps } from './ParentSize.model'

const props = withDefaults(defineProps<ParentSizeProps>(), ParentSizeDefaultProps)
const { class: className, debounceTime, ignoreDimensions, parentSizeStyles } = toRefs(props)
const attrs = useAttrs()
const target = useTemplateRef('target')
const mergedStyles = computed(() => ({
  ...parentSizeStyles.value,
  ...(attrs.style as object),
}))
const mergedClasses = computed(() => ['w-full h-full', className.value])

const state = reactive({
  width: 0,
  height: 0,
  top: 0,
  left: 0,
})

const attrsWithoutClassAndStyle = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  return rest
})

const normalizedIgnore = computed(() =>
  Array.isArray(ignoreDimensions.value) ? ignoreDimensions.value : [ignoreDimensions.value],
)

function updateDimensions(rect: DOMRectReadOnly) {
  const { width, height, top, left } = rect
  const newState = { width, height, top, left }

  const hasChange = Object.keys(newState).some(
    key => state[key as keyof typeof state] !== newState[key as keyof typeof state],
  )

  if (!hasChange)
    return

  const shouldUpdate = !Object.keys(newState).every(key =>
    normalizedIgnore.value.includes(key as keyof typeof state),
  )

  if (shouldUpdate) {
    Object.assign(state, newState)
  }
}

const debouncedUpdate = useDebounceFn(updateDimensions, debounceTime.value)

useResizeObserver(target, (entries) => {
  const entry = entries[0]
  if (entry)
    debouncedUpdate(entry.contentRect)
})
</script>

<template>
  <div
    ref="target"
    :class="mergedClasses"
    :style="mergedStyles"
    v-bind="attrsWithoutClassAndStyle"
  >
    <slot />
  </div>
</template>
