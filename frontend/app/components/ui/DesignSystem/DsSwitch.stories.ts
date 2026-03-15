import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DsSwitch from './DsSwitch.vue'

const meta = {
  title: 'Design System/Form/DsSwitch',
  component: DsSwitch,
  tags: ['autodocs'],
  args: {
    modelValue: false,
    variant: 'default',
    size: 'md',
    label: 'Airplane mode',
    hint: 'Toggle setting state',
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
    components: { DsSwitch },
    setup() {
      const model = ref(Boolean(args.modelValue))
      return { args, model }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <DsSwitch
          v-bind="args"
          v-model="model"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof DsSwitch>

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
    components: { DsSwitch },
    setup() {
      const defaultModel = ref(false)
      const accentModel = ref(true)
      const mixedModel = ref(false)
      return { args, defaultModel, accentModel, mixedModel }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-5 lg:grid-cols-3">
          <DsSwitch v-bind="args" v-model="defaultModel" variant="default" label="Default" />
          <DsSwitch v-bind="args" v-model="accentModel" variant="accent" label="Accent (on)" />
          <DsSwitch v-bind="args" v-model="mixedModel" variant="mixed" label="Mixed" />
        </div>
      </div>
    `,
  }),
}

export const SizeScale: Story = {
  name: 'Size / Scale',
  render: args => ({
    components: { DsSwitch },
    setup() {
      const smModel = ref(false)
      const mdModel = ref(true)
      const lgModel = ref(false)
      return { args, smModel, mdModel, lgModel }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack p-6 dark:bg-pureBlack dark:color-pureWhite">
        <div class="grid gap-5 lg:grid-cols-3">
          <DsSwitch v-bind="args" v-model="smModel" size="sm" label="Small" />
          <DsSwitch v-bind="args" v-model="mdModel" size="md" label="Medium" />
          <DsSwitch v-bind="args" v-model="lgModel" size="lg" label="Large" />
        </div>
      </div>
    `,
  }),
}

export const StateInvalid: Story = {
  name: 'State / Invalid',
  args: {
    modelValue: false,
    invalid: true,
    required: true,
    error: 'Please confirm this field.',
    hint: '',
    label: 'Required toggle',
  },
}

export const StateDisabled: Story = {
  name: 'State / Disabled',
  args: {
    modelValue: true,
    disabled: true,
    label: 'Disabled selected',
    hint: 'Disabled contract preview.',
  },
}

export const StateRequired: Story = {
  name: 'State / Required',
  args: {
    modelValue: false,
    required: true,
    label: 'Required toggle',
    hint: 'Blur without turning it on to inspect required behavior.',
  },
}
