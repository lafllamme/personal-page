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
            <div class="space-y-6 md:space-y-7">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Body width + gutter</p>
              <article class="border border-solid border-pureBlack/16 rounded-xl p-5 dark:border-pureWhite/16">
                <p class="font-manrope text-sm leading-relaxed opacity-80">
                  Switch mode/max/gutter to verify content constraints and horizontal rhythm.
                </p>
              </article>
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
            <div class="space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">contained / 6xl / md</p>
              <div class="border border-solid border-pureBlack/16 rounded-xl p-4 dark:border-pureWhite/16">Contained content lane</div>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="sm" :bordered="false" :debug="true">
          <DsSectionBody mode="fluid" :debug="true">
            <div class="space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">fluid</p>
              <div class="border border-solid border-pureBlack/16 rounded-xl p-4 dark:border-pureWhite/16">Fluid full-width lane</div>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="sm" :bordered="false" :debug="true">
          <DsSectionBody mode="bleed" gutter="md" :debug="true">
            <div class="space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">bleed / md</p>
              <div class="border border-solid border-pureBlack/16 rounded-xl p-4 dark:border-pureWhite/16">Bleed lane with controlled negative offset</div>
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
