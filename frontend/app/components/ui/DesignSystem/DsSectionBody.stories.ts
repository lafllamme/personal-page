import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionBody from './DsSectionBody.vue'
import DsSectionShell from './DsSectionShell.vue'

const meta = {
  title: 'Design System/Layout/DsSectionBody',
  component: DsSectionBody,
  tags: ['autodocs'],
  args: {
    as: 'div',
    mode: 'contained',
    max: '7xl',
    gutter: 'md',
    debug: true,
  },
  argTypes: {
    as: { control: 'select', options: ['div', 'section', 'article'] },
    mode: { control: 'select', options: ['contained', 'fluid', 'bleed'] },
    max: { control: 'select', options: ['5xl', '6xl', '7xl', 'full'] },
    gutter: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    debug: { control: 'boolean' },
  },
} satisfies Meta<typeof DsSectionBody>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { DsSectionShell, DsSectionBody },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionShell spacing="md" :debug="true">
          <DsSectionBody v-bind="args">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 md:p-5 space-y-6 md:space-y-7">
              <div class="space-y-2">
                <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Body width + gutter</p>
                <h2 class="font-clash-regular text-[clamp(1.35rem,2.2vw,2rem)] leading-tight uppercase">Section Body Playground</h2>
              </div>
              <div class="grid gap-4 lg:grid-cols-3">
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-4">
                  <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">column 1</p>
                </div>
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-4">
                  <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">column 2</p>
                </div>
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-4">
                  <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">column 3</p>
                </div>
              </div>
              <p class="font-manrope text-sm leading-relaxed opacity-80 max-w-3xl">
                Switch mode/max/gutter to verify body constraints and horizontal rhythm in realistic content layouts.
              </p>
            </div>
          </DsSectionBody>
        </DsSectionShell>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const ModeComparison: Story = {
  render: () => ({
    components: { DsSectionShell, DsSectionBody },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite space-y-4">
        <DsSectionShell spacing="sm" :bordered="false" :debug="true">
          <DsSectionBody mode="contained" max="6xl" gutter="md" :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">contained / 6xl / md</p>
              <div class="grid gap-3 md:grid-cols-2">
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-3">Contained lane A</div>
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-3">Contained lane B</div>
              </div>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="sm" :bordered="false" :debug="true">
          <DsSectionBody mode="fluid" :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">fluid</p>
              <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-3">Fluid full-width lane</div>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="sm" :bordered="false" :debug="true">
          <DsSectionBody mode="bleed" gutter="md" :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">bleed / md</p>
              <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-3">Bleed lane with controlled negative offset</div>
            </div>
          </DsSectionBody>
        </DsSectionShell>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
