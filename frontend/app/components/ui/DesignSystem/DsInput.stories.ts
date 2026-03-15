import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { nextTick, onMounted, ref } from 'vue'
import DsInput from './DsInput.vue'

const meta = {
  title: 'Design System/Form/DsInput',
  component: DsInput,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    type: 'text',
    variant: 'floating',
    shape: 'rounded',
    label: 'Email',
    placeholder: 'Email',
    fillText: 'name@domain.com',
    hint: '',
    error: '',
    required: true,
    disabled: false,
    readonly: false,
    invalid: false,
  },
  argTypes: {
    modelValue: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'url', 'tel'] },
    variant: { control: 'select', options: ['default', 'floating'] },
    shape: { control: 'select', options: ['rounded', 'pill'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    fillText: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    invalid: { control: 'boolean' },
  },
  render: args => ({
    components: { DsInput },
    setup() {
      const model = ref(String(args.modelValue ?? ''))
      return { args, model }
    },
    template: `
      <div class="max-w-xl">
        <DsInput
          v-bind="args"
          v-model="model"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof DsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultState: Story = {
  name: 'State / Default',
  args: {
    variant: 'floating',
    label: 'Subject',
    fillText: 'Choose a subject',
    required: true,
  },
}

export const HoverState: Story = {
  name: 'State / Hover',
  render: () => ({
    components: { DsInput },
    setup() {
      const hoverValue = ref('')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const input = root.value?.querySelector('input')
        input?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      })

      return { hoverValue, root }
    },
    template: `
      <div ref="root" class="max-w-xl">
        <DsInput
          id="input-state-hover"
          v-model="hoverValue"
          variant="floating"
          label="Topic"
          fill-text="Hover this field"
          required
        />
      </div>
    `,
  }),
}

export const FocusState: Story = {
  name: 'State / Focus',
  render: () => ({
    components: { DsInput },
    setup() {
      const focusValue = ref('')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const input = root.value?.querySelector('input')
        input?.focus()
      })

      return { focusValue, root }
    },
    template: `
      <div ref="root" class="max-w-xl">
        <DsInput
          id="input-state-focus"
          v-model="focusValue"
          variant="floating"
          label="Email"
          fill-text="name@domain.com"
          required
        />
      </div>
    `,
  }),
}

export const ReadOnlyState: Story = {
  name: 'State / Read-only',
  args: {
    variant: 'floating',
    label: 'Status',
    fillText: 'Published',
    modelValue: 'Published',
    readonly: true,
  },
}

export const DisabledState: Story = {
  name: 'State / Disabled',
  args: {
    variant: 'floating',
    label: 'Phone',
    fillText: '+49 000 000000',
    modelValue: 'Disabled value',
    disabled: true,
  },
}

export const ErrorState: Story = {
  name: 'State / Error',
  args: {
    variant: 'floating',
    label: 'Email',
    type: 'email',
    fillText: 'name@domain.com',
    error: 'Please enter a valid email address.',
    required: true,
  },
  parameters: {
    globals: {
      colorMode: 'light',
      snapshotMode: true,
    },
  },
}

export const ShapeRounded: Story = {
  name: 'Shape / Rounded (default)',
  args: {
    shape: 'rounded',
    variant: 'floating',
    label: 'Subject',
    modelValue: 'Editorial feedback',
  },
}

export const ShapePill: Story = {
  name: 'Shape / Pill',
  args: {
    shape: 'pill',
    variant: 'floating',
    label: 'Subject',
    modelValue: 'Editorial feedback',
  },
}
