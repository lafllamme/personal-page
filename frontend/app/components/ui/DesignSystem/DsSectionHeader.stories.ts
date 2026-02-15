import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionHeader from './DsSectionHeader.vue'

const meta: Meta<typeof DsSectionHeader> = {
  title: 'Foundation/DsSectionHeader',
  component: DsSectionHeader,
  tags: ['autodocs'],
  args: {
    kicker: 'foundation',
    title: 'Section Header',
    description: 'Reusable heading wrapper for each design-system section.',
  },
}

export default meta
type Story = StoryObj<typeof DsSectionHeader>

export const Playground: Story = {}
