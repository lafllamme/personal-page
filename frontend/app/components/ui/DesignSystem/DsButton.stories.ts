import { h } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsButton from './DsButton.vue'
import DsButtonMatrixPreview from './DsButtonMatrixPreview.vue'
import DsSectionContainer from './DsSectionContainer.vue'

const meta = {
  title: 'Design System/Components/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    previewState: 'default',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quartery', 'quaternary'],
    },
    previewState: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus-visible'],
    },
    disabled: { control: 'boolean' },
  },
  render: args => ({
    components: { DsButton, DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block" :full-viewport="false" :bordered="false">
          <div class="flex justify-center">
            <DsButton v-bind="args">Click Me</DsButton>
          </div>
        </DsSectionContainer>
      </div>
    `,
  }),
} satisfies Meta<typeof DsButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <DsButton variant="primary">Click Me</DsButton>
        <DsButton variant="secondary">Click Me</DsButton>
        <DsButton variant="tertiary">Click Me</DsButton>
        <DsButton variant="quartery">Click Me</DsButton>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
}

export const Matrix: Story = {
  render: () => ({
    render() {
      return h(DsButtonMatrixPreview)
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
