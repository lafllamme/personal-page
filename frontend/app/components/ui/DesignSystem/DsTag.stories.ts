import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsTag from './DsTag.vue'

const meta = {
  title: 'Foundation/DsTag',
  component: DsTag,
  tags: ['autodocs'],
  args: {
    active: false,
    disabled: false,
    variant: 'default',
    previewState: 'default',
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'accent'] },
    previewState: { control: 'select', options: ['default', 'hover', 'active', 'focus-visible'] },
  },
  render: args => ({
    components: { DsTag },
    setup() {
      return { args }
    },
    template: `<DsTag v-bind="args">AI</DsTag>`,
  }),
} satisfies Meta<typeof DsTag>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { DsTag },
    template: `
      <div class="flex flex-wrap gap-2">
        <DsTag variant="default">AI</DsTag>
        <DsTag variant="default" active>Policy</DsTag>
        <DsTag variant="accent">Infra</DsTag>
        <DsTag variant="accent" active>Security</DsTag>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { DsTag },
    template: `
      <div class="grid gap-3">
        <div class="flex flex-wrap gap-2">
          <DsTag variant="default">Default</DsTag>
          <DsTag variant="default" preview-state="hover">Hover</DsTag>
          <DsTag variant="default" preview-state="active">Active</DsTag>
          <DsTag variant="default" preview-state="focus-visible">Focus</DsTag>
          <DsTag variant="default" disabled>Disabled</DsTag>
        </div>
        <div class="flex flex-wrap gap-2">
          <DsTag variant="accent">Default</DsTag>
          <DsTag variant="accent" preview-state="hover">Hover</DsTag>
          <DsTag variant="accent" preview-state="active">Active</DsTag>
          <DsTag variant="accent" preview-state="focus-visible">Focus</DsTag>
          <DsTag variant="accent" disabled>Disabled</DsTag>
        </div>
      </div>
    `,
  }),
}

export const DarkMode: Story = {
  render: () => ({
    components: { DsTag },
    template: `
      <div class="dark bg-pureBlack color-pureWhite p-6">
        <div class="flex flex-wrap gap-2">
          <DsTag variant="default">AI</DsTag>
          <DsTag variant="accent">Policy</DsTag>
        </div>
      </div>
    `,
  }),
}

export const A11yNotes: Story = {
  render: () => ({
    template: `
      <article class="max-w-2xl space-y-2 text-sm leading-relaxed">
        <p><strong>Keyboard:</strong> focus-visible ring available on tag buttons.</p>
        <p><strong>Usage:</strong> use active state for current filter only.</p>
      </article>
    `,
  }),
}
