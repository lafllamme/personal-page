import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import DsButton from './DsButton.vue'
import DsButtonMatrixPreview from './DsButtonMatrixPreview.vue'
import DsSectionContainer from './DsSectionContainer.vue'

const meta = {
  title: 'Foundation/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  args: {
    type: 'primary',
    variant: 'default',
    disabled: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary'],
    },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
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

export const DefaultPrimary: Story = {
  name: 'Default / Primary',
  args: { variant: 'default', type: 'primary' },
}

export const DefaultSecondary: Story = {
  name: 'Default / Secondary',
  args: { variant: 'default', type: 'secondary' },
}

export const DefaultTertiary: Story = {
  name: 'Default / Tertiary',
  args: { variant: 'default', type: 'tertiary' },
}

export const DefaultQuaternary: Story = {
  name: 'Default / Quaternary',
  args: { variant: 'default', type: 'quaternary' },
}

export const AccentPrimary: Story = {
  name: 'Accent / Primary',
  args: { variant: 'accent', type: 'primary' },
}

export const AccentSecondary: Story = {
  name: 'Accent / Secondary',
  args: { variant: 'accent', type: 'secondary' },
}

export const AccentTertiary: Story = {
  name: 'Accent / Tertiary',
  args: { variant: 'accent', type: 'tertiary' },
}

export const AccentQuaternary: Story = {
  name: 'Accent / Quaternary',
  args: { variant: 'accent', type: 'quaternary' },
}

export const Variants: Story = {
  name: 'All Variants (Grid)',
  render: () => ({
    components: { DsButton },
    template: `
      <div class="grid gap-4">
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">default</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton type="primary" variant="default">Click Me</DsButton>
          <DsButton type="secondary" variant="default">Click Me</DsButton>
          <DsButton type="tertiary" variant="default">Click Me</DsButton>
          <DsButton type="quaternary" variant="default">Click Me</DsButton>
        </div>
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">accent</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton type="primary" variant="accent">Click Me</DsButton>
          <DsButton type="secondary" variant="accent">Click Me</DsButton>
          <DsButton type="tertiary" variant="accent">Click Me</DsButton>
          <DsButton type="quaternary" variant="accent">Click Me</DsButton>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
}

export const States: Story = {
  render: () => ({
    render() {
      return h(DsButtonMatrixPreview)
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const DarkMode: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div class="dark bg-pureBlack color-pureWhite p-6">
        <div class="flex flex-wrap items-center gap-3">
          <DsButton type="primary" variant="default">Click Me</DsButton>
          <DsButton type="primary" variant="accent">Click Me</DsButton>
          <DsButton type="secondary" variant="default">Click Me</DsButton>
          <DsButton type="secondary" variant="accent">Click Me</DsButton>
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
}

export const A11yNotes: Story = {
  render: () => ({
    template: `
      <article class="max-w-2xl space-y-2 text-sm leading-relaxed">
        <p><strong>Keyboard:</strong> focus-visible ring is present on all button types.</p>
        <p><strong>Contrast:</strong> default and accent styles are mapped to pure black/white and toxic scale roles.</p>
        <p><strong>Semantics:</strong> use button for actions, link for navigation.</p>
      </article>
    `,
  }),
}
