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
            <div class="space-y-6 md:space-y-7">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell spacing rhythm</p>
              <article class="border border-solid border-pureBlack/16 rounded-xl p-5 dark:border-pureWhite/16 md:max-w-2xl">
                <p class="font-manrope text-sm leading-relaxed opacity-80">
                  Toggle spacing/border/screen to inspect vertical section behavior.
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

export const StackComparison: Story = {
  render: () => ({
    components: { DsSectionShell, DsSectionBody },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionShell spacing="sm" :debug="true">
          <DsSectionBody :debug="true">
            <div class="space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell / sm</p>
              <div class="border border-solid border-pureBlack/16 rounded-xl p-4 dark:border-pureWhite/16">Section A</div>
            </div>
          </DsSectionBody>
        </DsSectionShell>

        <DsSectionShell spacing="lg" :debug="true">
          <DsSectionBody :debug="true">
            <div class="space-y-4">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Shell / lg</p>
              <div class="border border-solid border-pureBlack/16 rounded-xl p-4 dark:border-pureWhite/16">Section B</div>
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
