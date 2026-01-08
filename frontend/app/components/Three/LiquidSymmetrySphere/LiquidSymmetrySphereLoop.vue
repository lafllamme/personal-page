<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import consola from 'consola'
import { watch } from 'vue'

const props = defineProps<{
  active: boolean
  onFrame: (deltaSeconds: number) => void
}>()

const { start, stop, onBeforeRender, isActive } = useLoop()

onBeforeRender(({ delta }) => {
  if (props.active)
    props.onFrame(delta)
})

watch(
  () => props.active,
  (active) => {
    if (active)
      start()
    else
      stop()
    consola.debug('[LiquidSymmetry] loop toggle', { active })
  },
  { immediate: true },
)

watch(
  isActive,
  (active) => {
    consola.debug('[LiquidSymmetry] loop isActive', { active })
  },
  { immediate: true },
)
</script>
