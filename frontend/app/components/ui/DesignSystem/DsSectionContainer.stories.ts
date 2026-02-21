import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionContainer from './DsSectionContainer.vue'

const meta = {
  title: 'Design System/Layout/DsSectionContainer',
  component: DsSectionContainer,
  tags: ['autodocs'],
  args: {
    as: 'section',
    spacing: 'lg',
    fullViewport: true,
    bordered: true,
    contained: true,
    max: '7xl',
    gutter: 'md',
    layout: 'grid',
    gap: 'md',
  },
  argTypes: {
    as: { control: 'select', options: ['section', 'header', 'div'] },
    spacing: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    fullViewport: { control: 'boolean' },
    bordered: { control: 'boolean' },
    contained: { control: 'boolean' },
    max: { control: 'select', options: ['7xl', 'full'] },
    gutter: { control: 'select', options: ['none', 'md', 'lg'] },
    layout: { control: 'select', options: ['grid', 'flex', 'block'] },
    gap: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof DsSectionContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer v-bind="args">
          <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">components</p>
          <h2 class="font-clash-regular text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">Section Container</h2>
          <article class="border border-solid border-pureBlack/16 rounded-xl p-5 dark:border-pureWhite/16 md:max-w-2xl">
            <p class="font-manrope text-sm leading-relaxed opacity-80">
              This mirrors the same section lane behavior used on the design-system page.
            </p>
          </article>
        </DsSectionContainer>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const FullViewportStage: Story = {
  args: {
    fullViewport: true,
    bordered: true,
  },
  render: args => ({
    components: { DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer v-bind="args">
          <h2 class="font-clash-regular text-[clamp(1.8rem,4.2vw,3.2rem)] leading-[1.02] uppercase">Full Viewport Stage</h2>
          <p class="font-manrope max-w-xl text-sm md:text-base opacity-80">
            Full viewport mode is useful for intro and stage sections.
          </p>
        </DsSectionContainer>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
