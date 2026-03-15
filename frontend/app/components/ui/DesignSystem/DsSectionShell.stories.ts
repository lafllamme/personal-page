import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionBody from './DsSectionBody.vue'
import DsSectionShell from './DsSectionShell.vue'

const meta = {
  title: 'Design System/Layout/DsSectionShell',
  component: DsSectionShell,
  tags: ['autodocs'],
  args: {
    as: 'section',
    spacing: 'md',
    screen: false,
    bordered: true,
    debug: true,
  },
  argTypes: {
    as: { control: 'select', options: ['section', 'header', 'div'] },
    spacing: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    screen: { control: 'boolean' },
    bordered: { control: 'boolean' },
    debug: { control: 'boolean' },
  },
} satisfies Meta<typeof DsSectionShell>

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
        <DsSectionShell v-bind="args">
          <DsSectionBody :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 md:p-5 space-y-6 md:space-y-7">
              <div class="space-y-2">
                <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell spacing rhythm</p>
                <h2 class="font-clash-regular text-[clamp(1.35rem,2.2vw,2rem)] leading-tight uppercase">Section Shell Playground</h2>
                <p class="font-manrope text-sm leading-relaxed opacity-80 max-w-3xl">
                  Toggle spacing, border and screen to inspect shell-level vertical rhythm and section separation.
                </p>
              </div>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-4">
                  <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">left lane</p>
                  <p class="font-manrope text-sm leading-relaxed opacity-85 mt-2">Content block in lane A.</p>
                </div>
                <div class="bg-[#ef4444]/8 outline outline-1 outline-[#ef4444]/70 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/80 p-4">
                  <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">right lane</p>
                  <p class="font-manrope text-sm leading-relaxed opacity-85 mt-2">Content block in lane B.</p>
                </div>
              </div>
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

export const StackComparison: Story = {
  render: () => ({
    components: { DsSectionShell, DsSectionBody },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionShell spacing="sm" :debug="true">
          <DsSectionBody :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 space-y-3">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell / sm</p>
              <p class="font-manrope text-sm leading-relaxed opacity-85">Compact section rhythm for dense page modules.</p>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="lg" :debug="true">
          <DsSectionBody :debug="true">
            <div class="bg-[#10b981]/8 outline outline-1 outline-[#10b981]/80 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 p-4 space-y-3">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell / lg</p>
              <p class="font-manrope text-sm leading-relaxed opacity-85">Expanded rhythm for stage-like sections and hero blocks.</p>
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
