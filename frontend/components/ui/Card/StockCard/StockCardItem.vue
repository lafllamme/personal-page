<script setup lang="ts">
import type { StockQuote } from './StockCardItem.model'
import NumberTicker from '@/components/ui/Text/NumberTicker/NumberTicker.vue'
import { computeRangeWidth } from './StockCardItem.model'

interface Props {
  stock: StockQuote
}

const props = defineProps<Props>()

const boxShadowClass = useClsx(
  'shadow-[0_8px_25px_rgba(0,0,0,0.12),0_3px_10px_rgba(0,0,0,0.08)]',
  'dark:shadow-[0_8px_25px_rgba(255,255,255,0.12),0_3px_10px_rgba(255,255,255,0.08)]',
  'rounded-3xl p-5 sm:p-6 md:p-8 backdrop-blur-sm',
)

const surfaceLight = 'bg-sand-1'
const surfaceDark = 'dark:bg-olive-2'

const rangeWidth = computed(() => computeRangeWidth(props.stock))
</script>

<template>
  <div
    :class="useClsx(boxShadowClass, surfaceLight, surfaceDark, 'color-pureBlack w-full min-w-0 h-full overflow-hidden')"
  >
    <div :class="useClsx('flex h-full min-h-0 flex-col')">
      <!-- Header: symbol/name on the left, price/change on the right -->
      <div :class="useClsx('min-w-0 flex items-start justify-between gap-4 md:gap-6')">
        <div :class="useClsx('min-w-0')">
          <div
            :class="useClsx('font-manrope mb-1 text-[clamp(16px,1.6vw,24px)] font-light tracking-tight color-gray-12 leading-tight')"
          >
            {{ stock.symbol }}
          </div>
          <div :class="useClsx('truncate font-manrope text-xs md:text-sm tracking-widest uppercase color-gray-10')">
            {{ stock.name || stock.symbol }}
          </div>
        </div>
        <div :class="useClsx('text-right min-w-0')">
          <div :class="useClsx('font-manrope mb-1 flex items-baseline justify-end gap-1 md:gap-1.5 leading-none')">
            <span
              :class="useClsx('align-baseline text-[clamp(14px,1.2vw,18px)] opacity-70 color-pureBlack dark:color-pureWhite')"
            >$</span>
            <span :class="useClsx('text-[clamp(20px,2vw,30px)] tabular-nums color-pureBlack dark:color-pureWhite')">
              <NumberTicker :value="stock.price!" />
            </span>
            <span
              v-if="stock.change !== null"
              :class="useClsx('ml-1 flex items-center gap-1 text-[clamp(12px,1.1vw,14px)] whitespace-nowrap', stock.change < 0 ? 'color-crimson-10' : 'color-jade-9')"
            >
              <Icon
                :name="stock.change < 0 ? 'tabler:trending-down' : 'tabler:trending-up'"
                :class="useClsx('size-4')"
              />
              <span class="tabular-nums">{{ stock.change > 0 ? '+' : '' }}<NumberTicker :value="stock.change" /></span>
            </span>
          </div>
          <div :class="useClsx('font-manrope text-xs md:text-sm font-light color-gray-10 truncate')">
            {{ stock.industry || '—' }}
          </div>
        </div>
      </div>

      <!-- Spacer to naturally push the range section to the bottom on tall cards -->
      <div class="flex-1" />

      <!-- Bottom: day range anchored to the bottom for consistent visual balance -->
      <div
        v-if="stock.dayRange.low !== null && stock.dayRange.high !== null"
        :class="useClsx('mt-4 border-t border-gray-7 border-solid pt-4')"
      >
        <div :class="useClsx('font-manrope mb-3 text-xs tracking-wider uppercase color-gray-10')">
          Day Range
        </div>
        <div :class="useClsx('relative')">
          <div :class="useClsx('h-1.5 rounded-full bg-gray-6 dark:bg-gray-700')" />
          <div
            v-if="stock.price !== null && stock.dayRange.low !== null && stock.dayRange.high !== null"
            :class="useClsx('absolute top-0 left-0 h-1.5 rounded-full from-olive-12 to-mint-11 bg-gradient-to-r transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]')"
            :style="{ width: rangeWidth }"
          />

          <div :class="useClsx('mt-2 flex justify-between text-xs')">
            <span :class="useClsx('font-manrope color-gray-11')">${{ stock.dayRange.low?.toFixed(2) || 'N/A' }}</span>
            <span :class="useClsx('font-manrope color-gray-11')">${{ stock.dayRange.high?.toFixed(2) || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
