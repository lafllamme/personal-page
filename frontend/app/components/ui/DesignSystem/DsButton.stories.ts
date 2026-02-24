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
    type: 'primary',
    variant: 'default',
    size: 'md',
    tracking: 'relaxed',
    weight: 'default',
    decryptAnimateOn: 'both',
    decryptRevealDirection: 'start',
    decryptSpeed: 45,
    decryptMaxIterations: 10,
    decryptSequential: true,
    decryptUseOriginalCharsOnly: false,
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
    decryptAnimateOn: {
      control: 'select',
      options: ['view', 'hover', 'both'],
    },
    decryptRevealDirection: {
      control: 'select',
      options: ['start', 'end', 'center'],
    },
    decryptSpeed: {
      control: { type: 'number', min: 16, max: 300, step: 1 },
    },
    decryptMaxIterations: {
      control: { type: 'number', min: 1, max: 40, step: 1 },
    },
    decryptSequential: { control: 'boolean' },
    decryptUseOriginalCharsOnly: { control: 'boolean' },
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
  render: args => ({
    components: { DsButton },
    setup() {
      return { args }
    },
    template: `
      <div class="grid gap-4">
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">default</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton type="primary" variant="default" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="secondary" variant="default" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="tertiary" variant="default" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="quaternary" variant="default" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
        </div>
        <div class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">accent</div>
        <div class="flex flex-wrap items-center gap-3">
          <DsButton type="primary" variant="accent" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="secondary" variant="accent" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="tertiary" variant="accent" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
          <DsButton type="quaternary" variant="accent" :size="args.size" :tracking="args.tracking" :weight="args.weight" :decrypt-animate-on="args.decryptAnimateOn" :decrypt-reveal-direction="args.decryptRevealDirection" :decrypt-speed="args.decryptSpeed" :decrypt-max-iterations="args.decryptMaxIterations" :decrypt-sequential="args.decryptSequential" :decrypt-use-original-chars-only="args.decryptUseOriginalCharsOnly" :disabled="args.disabled">Click Me</DsButton>
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
