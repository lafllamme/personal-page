import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import DsButton from './DsButton.vue'
import DsButtonIconVariantsPreview from './DsButtonIconVariantsPreview.vue'
import DsButtonMatrixPreview from './DsButtonMatrixPreview.vue'
import DsSectionContainer from './DsSectionContainer.vue'
import DsSpacingSizingPreview from './DsSpacingSizingPreview.vue'

const meta = {
  title: 'Design System/Components/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  args: {
    text: 'Click Me',
    type: 'primary',
    variant: 'default',
    size: 'md',
    shape: 'pill',
    tracking: 'default',
    weight: 'default',
    icon: '',
    iconPosition: 'left',
    iconOnly: false,
    ariaLabel: '',
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
      options: ['default', 'accent', 'mixed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
    },
    tracking: {
      control: 'select',
      options: ['default', 'relaxed'],
    },
    weight: {
      control: 'select',
      options: ['default', 'strong'],
    },
    icon: { control: 'text' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    iconOnly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
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

export const MixedPrimary: Story = {
  name: 'Mixed / Primary',
  args: { variant: 'mixed', type: 'primary' },
}

export const MixedSecondary: Story = {
  name: 'Mixed / Secondary',
  args: { variant: 'mixed', type: 'secondary' },
}

export const MixedTertiary: Story = {
  name: 'Mixed / Tertiary',
  args: { variant: 'mixed', type: 'tertiary' },
}

export const MixedQuaternary: Story = {
  name: 'Mixed / Quaternary',
  args: { variant: 'mixed', type: 'quaternary' },
}

export const LeadingIcon: Story = {
  name: 'Content / Leading Icon',
  args: {
    text: 'Read More',
    icon: 'iconoir:sparks',
    iconPosition: 'left',
    iconOnly: false,
  },
}

export const TrailingIcon: Story = {
  name: 'Content / Trailing Icon',
  args: {
    text: 'Read More',
    icon: 'iconoir:sparks',
    iconPosition: 'right',
    iconOnly: false,
  },
}

export const IconOnly: Story = {
  name: 'Content / Icon Only',
  args: {
    text: 'Open Link',
    icon: 'iconoir:plus',
    iconPosition: 'left',
    iconOnly: true,
    ariaLabel: 'Open link',
    animation: 'none',
  },
}

export const VariantTextWithTrailingIcon: Story = {
  name: 'Content / All Variants + Trailing Icon',
  args: {
    text: 'Read More',
    icon: 'iconoir:sparks',
    iconOnly: false,
  },
  render: args => ({
    components: { DsButtonIconVariantsPreview },
    render() {
      return h(DsButtonIconVariantsPreview, {
        mode: 'text',
        text: args.text ?? 'Read More',
        icon: args.icon || 'iconoir:sparks',
        size: (args.size ?? 'md') as 'sm' | 'md' | 'lg',
        shape: (args.shape ?? 'pill') as 'pill' | 'rounded',
        tracking: (args.tracking ?? 'default') as 'default' | 'relaxed',
        weight: (args.weight ?? 'default') as 'default' | 'strong',
        animation: (args.animation ?? 'rotate') as 'rotate' | 'decrypt' | 'none',
        disabled: Boolean(args.disabled),
        ariaLabel: args.ariaLabel || 'Open action',
      })
    },
  }),
  parameters: {
    layout: 'centered',
  },
}

export const VariantIconOnly: Story = {
  name: 'Content / All Variants + Icon Only',
  args: {
    text: 'Open',
    icon: 'iconoir:plus',
    iconOnly: true,
    ariaLabel: 'Open action',
    animation: 'none',
  },
  render: args => ({
    components: { DsButtonIconVariantsPreview },
    render() {
      return h(DsButtonIconVariantsPreview, {
        mode: 'icon-only',
        text: args.text ?? 'Open',
        icon: args.icon || 'iconoir:plus',
        size: (args.size ?? 'md') as 'sm' | 'md' | 'lg',
        shape: (args.shape ?? 'pill') as 'pill' | 'rounded',
        tracking: (args.tracking ?? 'default') as 'default' | 'relaxed',
        weight: (args.weight ?? 'default') as 'default' | 'strong',
        animation: 'none',
        disabled: Boolean(args.disabled),
        ariaLabel: args.ariaLabel || 'Open action',
      })
    },
  }),
  parameters: {
    layout: 'centered',
  },
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
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">mixed</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton v-bind="args" type="primary" variant="mixed" />
          <DsButton v-bind="args" type="secondary" variant="mixed" />
          <DsButton v-bind="args" type="tertiary" variant="mixed" />
          <DsButton v-bind="args" type="quaternary" variant="mixed" />
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
        text: args.text,
        size: args.size,
        shape: args.shape,
        tracking: args.tracking,
        weight: args.weight,
        animation: args.animation,
        decrypt: args.decrypt,
        disabled: args.disabled,
      })
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const SizingAndSpacing: Story = {
  name: 'Sizing + Spacing (SM / MD / LG)',
  render: args => ({
    components: { DsSpacingSizingPreview },
    setup() {
      return { args }
    },
    render() {
      return h(DsSpacingSizingPreview, {
        shape: args.shape,
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

export const RoundedVariants: Story = {
  name: 'Shape / Rounded (All Variants)',
  args: {
    shape: 'rounded',
  },
  render: Variants.render,
  parameters: Variants.parameters,
}
