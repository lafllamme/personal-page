import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import DsButton from './DsButton.vue'
import DsButtonMatrixPreview from './DsButtonMatrixPreview.vue'
import DsSectionContainer from './DsSectionContainer.vue'
import DsSpacingSizingPreview from './DsSpacingSizingPreview.vue'

const meta = {
  title: 'Foundation/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  args: {
    text: 'Click Me',
    type: 'primary',
    variant: 'default',
    size: 'md',
    tracking: 'relaxed',
    weight: 'default',
    animation: 'rotate',
    decrypt: {
      animateOn: 'both',
      revealDirection: 'start',
      speed: 50,
      maxIterations: 10,
      sequential: true,
      useOriginalCharsOnly: false,
    },
    disabled: false,
  },
  argTypes: {
    text: { control: 'text' },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quaternary'],
    },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    tracking: {
      control: 'select',
      options: ['default', 'relaxed'],
    },
    weight: {
      control: 'select',
      options: ['default', 'strong'],
    },
    animation: {
      control: 'select',
      options: ['rotate', 'decrypt', 'none'],
    },
    decrypt: { control: 'object' },
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
            <DsButton v-bind="args" />
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
  render: args => ({
    components: { DsButton },
    setup() {
      return { args }
    },
    template: `
      <div class="grid gap-4">
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">default</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton v-bind="args" type="primary" variant="default" />
          <DsButton v-bind="args" type="secondary" variant="default" />
          <DsButton v-bind="args" type="tertiary" variant="default" />
          <DsButton v-bind="args" type="quaternary" variant="default" />
        </div>
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">accent</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton v-bind="args" type="primary" variant="accent" />
          <DsButton v-bind="args" type="secondary" variant="accent" />
          <DsButton v-bind="args" type="tertiary" variant="accent" />
          <DsButton v-bind="args" type="quaternary" variant="accent" />
        </div>
      </div>
    `,
  }),
  parameters: {
    layout: 'centered',
  },
}

export const States: Story = {
  render: args => ({
    components: { DsButtonMatrixPreview },
    setup() {
      return { args }
    },
    render() {
      return h(DsButtonMatrixPreview, {
        size: args.size,
        tracking: args.tracking,
        weight: args.weight,
        disabled: args.disabled,
      })
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const SizingAndSpacing: Story = {
  name: 'Sizing + Spacing',
  render: args => ({
    components: { DsSpacingSizingPreview },
    setup() {
      return { args }
    },
    render() {
      return h(DsSpacingSizingPreview, {
        size: args.size,
        tracking: args.tracking,
        weight: args.weight,
        disabled: args.disabled,
      })
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
