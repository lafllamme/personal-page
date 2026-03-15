import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DsRadio from './DsRadio.vue'

const radioOptions = [
  { label: 'Editorial feedback', value: 'editorial' },
  { label: 'Product question', value: 'product' },
  { label: 'Community support', value: 'community' },
]

const meta = {
  title: 'Design System/Form/DsRadio',
  component: DsRadio,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    options: radioOptions,
    variant: 'default',
    size: 'md',
    label: 'Topic',
    hint: 'Choose one option.',
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
    modelValue: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  render: args => ({
    components: { DsRadio },
    setup() {
      const model = ref(String(args.modelValue || ''))
      return { args, model }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="max-w-lg">
          <DsRadio
            v-bind="args"
            v-model="model"
          />
        </div>
      </div>
    `,
  }),
} satisfies Meta<typeof DsRadio>

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
    components: { DsRadio },
    setup() {
      const defaultModel = ref('')
      const accentModel = ref('product')
      const mixedModel = ref('community')
      return { args, defaultModel, accentModel, mixedModel, radioOptions }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-6 lg:grid-cols-3">
          <DsRadio v-bind="args" v-model="defaultModel" variant="default" label="Default" :options="radioOptions" />
          <DsRadio v-bind="args" v-model="accentModel" variant="accent" label="Accent" :options="radioOptions" />
          <DsRadio v-bind="args" v-model="mixedModel" variant="mixed" label="Mixed" :options="radioOptions" />
        </div>
      </div>
    `,
  }),
}

export const SizeScale: Story = {
  name: 'Size / Scale',
  render: args => ({
    components: { DsRadio },
    setup() {
      const smModel = ref('')
      const mdModel = ref('product')
      const lgModel = ref('community')
      return { args, smModel, mdModel, lgModel, radioOptions }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-6 lg:grid-cols-3">
          <DsRadio v-bind="args" v-model="smModel" size="sm" label="Small" :options="radioOptions" />
          <DsRadio v-bind="args" v-model="mdModel" size="md" label="Medium" :options="radioOptions" />
          <DsRadio v-bind="args" v-model="lgModel" size="lg" label="Large" :options="radioOptions" />
        </div>
      </div>
    `,
  }),
}

export const StateSelected: Story = {
  name: 'State / Selected',
  args: {
    modelValue: 'product',
    label: 'Selected state',
  },
}

export const StateInvalid: Story = {
  name: 'State / Invalid',
  args: {
    modelValue: '',
    invalid: true,
    required: true,
    error: 'Please choose an option.',
    hint: '',
    label: 'Required topic',
  },
}

export const StateDisabled: Story = {
  name: 'State / Disabled',
  args: {
    modelValue: 'product',
    disabled: true,
    label: 'Disabled selected',
    hint: 'Disabled contract preview.',
  },
}

export const StateRequired: Story = {
  name: 'State / Required',
  args: {
    modelValue: '',
    required: true,
    label: 'Required topic',
    hint: 'Blur without selection to inspect required behavior.',
  },
}
