import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsBadge from './DsBadge.vue'

const meta = {
  title: 'Design System/Components/DsBadge',
  component: DsBadge,
  tags: ['autodocs'],
  args: {
    text: 'Editorial',
    variant: 'default',
    type: 'solid',
    size: 'md',
    shape: 'pill',
    animation: 'none',
    dot: false,
    icon: '',
    disabled: false,
  },
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'mixed'],
    },
    type: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'crisp'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
    },
    animation: {
      control: 'select',
      options: ['none', 'shimmer', 'beam'],
    },
    dot: { control: 'boolean' },
    icon: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <DsBadge v-bind="args" />
      </div>
    `,
  }),
} satisfies Meta<typeof DsBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const VariantsAndTypesMatrix: Story = {
  name: 'Variants / Types Matrix',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-8 lg:grid-cols-3">
          <div class="space-y-4">
            <p class="space-grotesk-regular text-xs tracking-[0.14em] uppercase opacity-70">Default</p>
            <div class="flex flex-wrap gap-3">
              <DsBadge v-bind="args" text="Editorial" variant="default" type="solid" />
              <DsBadge v-bind="args" text="Outline" variant="default" type="outline" />
              <DsBadge v-bind="args" text="Soft" variant="default" type="soft" />
              <DsBadge v-bind="args" text="Crisp" variant="default" type="crisp" />
            </div>
          </div>

          <div class="space-y-4">
            <p class="space-grotesk-regular text-xs tracking-[0.14em] uppercase opacity-70">Accent</p>
            <div class="flex flex-wrap gap-3">
              <DsBadge v-bind="args" text="Release" variant="accent" type="solid" />
              <DsBadge v-bind="args" text="Signal" variant="accent" type="outline" />
              <DsBadge v-bind="args" text="Update" variant="accent" type="soft" />
              <DsBadge v-bind="args" text="Crisp" variant="accent" type="crisp" />
            </div>
          </div>

          <div class="space-y-4">
            <p class="space-grotesk-regular text-xs tracking-[0.14em] uppercase opacity-70">Mixed</p>
            <div class="flex flex-wrap gap-3">
              <DsBadge v-bind="args" text="Neutral + Accent" variant="mixed" type="solid" dot />
              <DsBadge v-bind="args" text="Hybrid" variant="mixed" type="outline" dot />
              <DsBadge v-bind="args" text="Context" variant="mixed" type="soft" dot />
              <DsBadge v-bind="args" text="Crisp Mix" variant="mixed" type="crisp" dot />
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const SizeScale: Story = {
  name: 'Size / Scale',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="flex flex-wrap items-center gap-3">
          <DsBadge v-bind="args" text="SM badge" size="sm" />
          <DsBadge v-bind="args" text="MD badge" size="md" />
        </div>
      </div>
    `,
  }),
}

export const ShapeScale: Story = {
  name: 'Shape / Pill + Rounded',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="flex flex-wrap items-center gap-3">
          <DsBadge v-bind="args" text="Pill shape" shape="pill" variant="default" type="outline" />
          <DsBadge v-bind="args" text="Rounded shape" shape="rounded" variant="accent" type="soft" />
        </div>
      </div>
    `,
  }),
}

export const StateHelpers: Story = {
  name: 'State / Dot + Icon',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="flex flex-wrap items-center gap-3">
          <DsBadge v-bind="args" text="Live" variant="accent" type="soft" dot />
          <DsBadge v-bind="args" text="Curated" variant="mixed" type="outline" icon="iconoir:star-solid" />
        </div>
      </div>
    `,
  }),
}

export const StateDisabled: Story = {
  name: 'State / Disabled',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="flex flex-wrap items-center gap-3">
          <DsBadge v-bind="args" text="Disabled" variant="default" type="solid" disabled />
          <DsBadge v-bind="args" text="Disabled Accent" variant="accent" type="outline" disabled />
          <DsBadge v-bind="args" text="Disabled Mixed" variant="mixed" type="soft" dot disabled />
        </div>
      </div>
    `,
  }),
}

export const AnimationShimmer: Story = {
  name: 'Animation / Shimmer',
  args: {
    text: 'Default Shimmer',
    variant: 'default',
    type: 'solid',
    animation: 'shimmer',
    dot: false,
    icon: '',
    disabled: false,
  },
}

export const AnimationBeam: Story = {
  name: 'Animation / Beam',
  args: {
    text: 'Default Beam',
    variant: 'default',
    type: 'solid',
    animation: 'beam',
    dot: false,
    icon: '',
    disabled: false,
  },
}

export const AnimationDisabledOff: Story = {
  name: 'Animation / Disabled Off',
  render: args => ({
    components: { DsBadge },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="flex flex-wrap items-center gap-3">
          <DsBadge v-bind="args" text="Disabled Shimmer" variant="default" type="soft" animation="shimmer" disabled />
          <DsBadge v-bind="args" text="Disabled Beam" variant="accent" type="outline" animation="beam" disabled />
        </div>
      </div>
    `,
  }),
}
