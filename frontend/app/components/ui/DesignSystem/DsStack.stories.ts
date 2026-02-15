import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsButton from './DsButton.vue'
import DsStack from './DsStack.vue'

const meta: Meta<typeof DsStack> = {
  title: 'Foundation/DsStack',
  component: DsStack,
  tags: ['autodocs'],
  argTypes: {
    as: { control: 'text' },
    gap: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
}

export default meta
type Story = StoryObj<typeof DsStack>

export const Playground: Story = {
  args: {
    gap: 'md',
    align: 'start',
  },
  render: args => ({
    components: { DsStack, DsButton },
    setup() {
      return { args }
    },
    template: `
      <DsStack v-bind="args">
        <DsButton>Click Me</DsButton>
        <DsButton type="secondary">Click Me</DsButton>
        <DsButton type="tertiary">Click Me</DsButton>
      </DsStack>
    `,
  }),
}
