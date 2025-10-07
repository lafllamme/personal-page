<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
import { getColors } from 'theme-colors'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
  squareColor: string
  base: number
}

const props = withDefaults(defineProps<Props>(), {
  base: 10,
})

const theme = getColors(props.squareColor)

const el = ref(null)
const grid = ref<(boolean | null)[][]>([])
const rows = ref(0)
const cols = ref(0)

const { width, height } = useElementSize(el)

function createGrid() {
  grid.value = []

  for (let i = 0; i < rows.value; i++) {
    grid.value.push(Array.from({ length: cols.value }, () => null) as (boolean | null)[])
  }
}

function createNewCell() {
  const x = Math.floor(Math.random() * cols.value)

  grid.value[0][x] = true
}

function moveCellsDown() {
  for (let row = rows.value - 1; row >= 0; row--) {
    for (let col = 0; col < cols.value; col++) {
      const cell = grid.value[row][col]
      const nextCell = Array.isArray(grid.value[row + 1]) ? grid.value[row + 1][col] : cell
      if (cell !== null && nextCell === null) {
        grid.value[row + 1][col] = grid.value[row][col]
        grid.value[row][col] = null
      }
    }
  }

  setTimeout(() => {
    const isFilled = grid.value[rows.value - 1].every(cell => cell !== null)
    if (Array.isArray(grid.value[rows.value]) && isFilled) {
      for (let col = 0; col < cols.value; col++) {
        grid.value[rows.value][col] = null
      }
    }
  }, 500)
}

function clearColumn() {
  const isFilled = grid.value[rows.value - 1].every(cell => cell === true)
  if (!isFilled)
    return

  for (let col = 0; col < cols.value; col++) {
    grid.value[rows.value - 1][col] = null
  }
}

function removeCell(row: number, col: number) {
  grid.value[row][col] = null
}

function calcGrid() {
  const cell = width.value / props.base

  rows.value = Math.floor(height.value / cell)
  cols.value = Math.floor(width.value / cell)

  createGrid()
}

watch(width, calcGrid)

let intervalId: NodeJS.Timeout | undefined

let timeoutId: NodeJS.Timeout | undefined

onMounted(() => {
  timeoutId = setTimeout(calcGrid, 50)

  intervalId = setInterval(() => {
    clearColumn()
    moveCellsDown()
    createNewCell()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
  clearTimeout(timeoutId)
})
</script>

<template>
  <Transition
    appear
    name="fade"
  >
    <div
      :class="cn('relative w-full ', props.class)"
      :style="{
        '--cell': `${width / cols}px`,
        '--rows': rows - 1,
      }"
    >
      <div
        ref="el"
        class="absolute inset-0 grid auto-rows-[--cell] justify-center -space-y-px"
      >
        <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="grid auto-cols-[--cell] grid-flow-col flex-1 -space-x-px"
        >
          <div
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :style="{
              '--border-color': '',
              '--dark-border-color': theme[900],
            }"
            class="relative border border-[--border-color] border-solid dark:border-[--dark-border-color]"
          >
            <div
              :class="[cell && 'cursor-pointer opacity-60']"
              :style="{
                '--square-color': theme[500],
                '--square-hover-color': theme[400],
                '--dark-square-color': theme[700],
                '--dark-square-hover-color': theme[600],
              }"
              class="will-change-[opacity] absolute inset-0 bg-[--square-color] opacity-0 transition-opacity duration-1000 dark:bg-[--dark-square-color] hover:bg-[--square-hover-color] dark:hover:bg-[--dark-square-hover-color]"
              @click="cell && removeCell(rowIndex, cellIndex)"
            />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
