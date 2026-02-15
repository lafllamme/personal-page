import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsButton from './DsButton.vue'
import DsCluster from './DsCluster.vue'

const meta: Meta<typeof DsCluster> = {
  title: 'Foundation/DsCluster',
  component: DsCluster,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    align: { control: 'select', options: ['start', 'center', 'end'] },
    justify: { control: 'select', options: ['start', 'between', 'end'] },
  },
}

export default meta
type Story = StoryObj<typeof DsCluster>

export const Playground: Story = {
  args: {
    gap: 'sm',
    align: 'center',
    justify: 'start',
  },
  render: args => ({
    components: { DsButton, DsCluster },
    setup() {
      return { args }
    },
    template: `
      <DsCluster v-bind="args">
        <DsButton variant="default" type="secondary">Click Me</DsButton>
        <DsButton variant="accent" type="secondary">Click Me</DsButton>
        <DsButton variant="accent" type="quaternary">Click Me</DsButton>
      </DsCluster>
    `,
  }),
}
