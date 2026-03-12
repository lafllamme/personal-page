import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DsCheckbox from './DsCheckbox.vue'

const meta = {
  title: 'Design System/Components/DsCheckbox',
  component: DsCheckbox,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    variant: 'default',
    size: 'md',
    label: 'Accept terms',
    hint: 'Confirm to continue.',
    error: '',
    required: false,
    disabled: false,
    invalid: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'mixed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    modelValue: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  render: args => ({
    components: { DsCheckbox },
    setup() {
      const model = ref(Boolean(args.modelValue))
      return { args, model }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <DsCheckbox
          v-bind="args"
          v-model="model"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof DsCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const VariantDefault: Story = {
  name: 'Variant / Default',
  args: { variant: 'default' },
}

export const VariantAccent: Story = {
  name: 'Variant / Accent',
  args: { variant: 'accent' },
}

export const VariantMixed: Story = {
  name: 'Variant / Mixed',
  args: { variant: 'mixed' },
}

export const VariantsMatrix: Story = {
  name: 'Variants / Matrix',
  render: args => ({
    components: { DsCheckbox },
    setup() {
      const defaultModel = ref(false)
      const accentModel = ref(true)
      const mixedModel = ref(false)
      return { args, defaultModel, accentModel, mixedModel }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-5 lg:grid-cols-3">
          <DsCheckbox v-bind="args" v-model="defaultModel" variant="default" label="Default" />
          <DsCheckbox v-bind="args" v-model="accentModel" variant="accent" label="Accent (checked)" />
          <DsCheckbox v-bind="args" v-model="mixedModel" variant="mixed" label="Mixed" />
        </div>
      </div>
    `,
  }),
}

export const SizeScale: Story = {
  name: 'Size / Scale',
  render: args => ({
    components: { DsCheckbox },
    setup() {
      const smModel = ref(false)
      const mdModel = ref(true)
      const lgModel = ref(false)
      return { args, smModel, mdModel, lgModel }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-5 lg:grid-cols-3">
          <DsCheckbox v-bind="args" v-model="smModel" size="sm" label="Small" />
          <DsCheckbox v-bind="args" v-model="mdModel" size="md" label="Medium" />
          <DsCheckbox v-bind="args" v-model="lgModel" size="lg" label="Large" />
        </div>
      </div>
    `,
  }),
}

export const StateChecked: Story = {
  name: 'State / Checked',
  args: {
    modelValue: true,
    label: 'Checked state',
  },
}

export const StateInvalid: Story = {
  name: 'State / Invalid',
  args: {
    modelValue: false,
    invalid: true,
    required: true,
    error: 'Please confirm this field.',
    hint: '',
    label: 'Required agreement',
  },
}

export const StateDisabled: Story = {
  name: 'State / Disabled',
  args: {
    modelValue: true,
    disabled: true,
    label: 'Disabled selected state',
    hint: 'Disabled contract preview.',
  },
}

export const StateRequired: Story = {
  name: 'State / Required',
  args: {
    modelValue: false,
    required: true,
    label: 'Required agreement',
    hint: 'Blur without selection to inspect required behavior.',
  },
}
