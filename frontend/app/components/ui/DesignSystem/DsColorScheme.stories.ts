import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsColorScheme from './DsColorScheme.vue'
import DsSectionBody from './DsSectionBody.vue'
import DsSectionShell from './DsSectionShell.vue'

const meta = {
  title: 'Design System/Components/DsColorScheme',
  component: DsColorScheme,
  tags: ['autodocs'],
} satisfies Meta<typeof DsColorScheme>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: () => ({
    components: { DsColorScheme },
    template: '<DsColorScheme />',
  }),
}

export const DesignSystemSection: Story = {
  render: () => ({
    components: { DsSectionShell, DsSectionBody, DsColorScheme },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionShell>
          <DsSectionBody>
            <div class="space-y-6 md:space-y-7">
              <div class="mb-7">
                <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
                  foundation
                </p>
                <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
                  Color Scheme
                </h2>
              </div>
              <DsColorScheme />
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
