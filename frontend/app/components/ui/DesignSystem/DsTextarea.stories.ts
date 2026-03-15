import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { nextTick, onMounted, ref } from 'vue'
import DsTextarea from './DsTextarea.vue'

const meta = {
  title: 'Design System/Form/DsTextarea',
  component: DsTextarea,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    shape: 'rounded',
    label: 'Article summary',
    placeholder: 'Article summary',
    fillText: 'Write a concise summary for publication.',
    hint: '',
    error: '',
    required: true,
    disabled: false,
    readonly: false,
    invalid: false,
    rows: 5,
    maxLength: 2000,
  },
  argTypes: {
    modelValue: { control: 'text' },
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
    rows: { control: { type: 'number', min: 2, max: 12, step: 1 } },
    maxLength: { control: { type: 'number', min: 1, max: 5000, step: 1 } },
  },
  render: args => ({
    components: { DsTextarea },
    setup() {
      const model = ref(String(args.modelValue ?? ''))
      return { args, model }
    },
    template: `
      <div class="max-w-3xl">
        <DsTextarea
          v-bind="args"
          v-model="model"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof DsTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultState: Story = {
  name: 'State / Default',
  args: {
    label: 'Subject',
    fillText: 'Choose a subject',
    required: true,
  },
}

export const HoverState: Story = {
  name: 'State / Hover',
  render: () => ({
    components: { DsTextarea },
    setup() {
      const hoverValue = ref('')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const textarea = root.value?.querySelector('textarea')
        textarea?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
      })

      return { hoverValue, root }
    },
    template: `
      <div ref="root" class="max-w-3xl">
        <DsTextarea
          id="textarea-state-hover"
          v-model="hoverValue"
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
    components: { DsTextarea },
    setup() {
      const focusValue = ref('')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const textarea = root.value?.querySelector('textarea')
        textarea?.focus()
      })

      return { focusValue, root }
    },
    template: `
      <div ref="root" class="max-w-3xl">
        <DsTextarea
          id="textarea-state-focus"
          v-model="focusValue"
          label="Summary"
          fill-text="Write a concise summary"
          required
        />
      </div>
    `,
  }),
}

export const ReadOnlyState: Story = {
  name: 'State / Read-only',
  args: {
    label: 'Status note',
    modelValue: 'Published and locked for editorial review.',
    readonly: true,
  },
}

export const DisabledState: Story = {
  name: 'State / Disabled',
  args: {
    label: 'Comment',
    modelValue: 'This textarea is disabled.',
    disabled: true,
  },
}

export const ErrorState: Story = {
  name: 'State / Error',
  args: {
    label: 'Email summary',
    fillText: 'name@domain.com',
    error: 'Please write at least 30 characters.',
    required: true,
  },
}

export const ShapeRounded: Story = {
  name: 'Shape / Rounded (default)',
  args: {
    shape: 'rounded',
    label: 'Summary',
    modelValue: 'A short editorial summary.',
  },
}

export const ShapePill: Story = {
  name: 'Shape / Pill',
  args: {
    shape: 'pill',
    label: 'Summary',
    modelValue: 'A short editorial summary.',
  },
}
