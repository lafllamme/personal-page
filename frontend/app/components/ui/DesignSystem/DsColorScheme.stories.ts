import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsColorScheme from './DsColorScheme.vue'
import DsSectionContainer from './DsSectionContainer.vue'

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
    components: { DsSectionContainer, DsColorScheme },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block">
          <div class="mb-7">
            <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
              foundation
            </p>
            <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
              Color Scheme
            </h2>
          </div>

          <DsColorScheme />
        </DsSectionContainer>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
