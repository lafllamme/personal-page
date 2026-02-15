import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsCard from './DsCard.vue'

const meta = {
  title: 'Design System/Components/DsCard',
  component: DsCard,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    interactive: false,
    padded: true,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
    },
    interactive: { control: 'boolean' },
    padded: { control: 'boolean' },
  },
  render: args => ({
    components: { DsCard },
    setup() {
      return { args }
    },
    template: `
      <DsCard v-bind="args">
        <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70">Story Card</p>
        <h3 class="font-clash-regular mt-2 text-xl uppercase leading-tight">Design System Surface</h3>
        <p class="font-manrope mt-2 text-sm opacity-85">Baseline card for docs and content modules.</p>
      </DsCard>
    `,
  }),
} satisfies Meta<typeof DsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { DsCard },
    template: `
      <div class="grid gap-4 md:grid-cols-3">
        <DsCard variant="default">
          <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70">default</p>
          <h3 class="font-clash-regular mt-2 text-xl uppercase leading-tight">Base</h3>
        </DsCard>
        <DsCard variant="subtle">
          <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70">subtle</p>
          <h3 class="font-clash-regular mt-2 text-xl uppercase leading-tight">Subtle</h3>
        </DsCard>
        <DsCard variant="accent" interactive>
          <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-70">accent + interactive</p>
          <h3 class="font-clash-regular mt-2 text-xl uppercase leading-tight">Signal</h3>
        </DsCard>
      </div>
    `,
  }),
}
