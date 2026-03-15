import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { nextTick, onMounted, ref } from 'vue'
import DsSelect from './DsSelect.vue'

const SELECT_OPTIONS = [
  { label: 'Editorial feedback', value: 'editorial-feedback' },
  { label: 'Product question', value: 'product-question' },
  { label: 'Partnership request', value: 'partnership-request' },
  { label: 'Press inquiry', value: 'press-inquiry' },
  { label: 'Community support', value: 'community-support' },
]

const meta = {
  title: 'Design System/Form/DsSelect',
  component: DsSelect,
  tags: ['autodocs'],
  args: {
    modelValue: '',
    options: SELECT_OPTIONS,
    shape: 'rounded',
    label: 'Topic',
    hint: '',
    error: '',
    required: true,
    placeholder: 'Topic',
    fillText: 'Please choose an option',
    emptyText: 'No entries available',
    disabled: false,
    invalid: false,
    previewState: 'default',
  },
  argTypes: {
    modelValue: { control: 'text' },
    options: { control: 'object' },
    shape: { control: 'select', options: ['rounded', 'pill'] },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    placeholder: { control: 'text' },
    fillText: { control: 'text' },
    emptyText: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    previewState: { control: 'select', options: ['default', 'hover', 'focus-visible'] },
  },
  render: args => ({
    components: { DsSelect },
    setup() {
      const model = ref(String(args.modelValue ?? ''))
      return { args, model }
    },
    template: `
      <div class="max-w-xl relative" style="min-height: 36rem; padding-bottom: 10rem; overflow: visible;">
        <DsSelect
          v-bind="args"
          v-model="model"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof DsSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DefaultState: Story = {
  name: 'State / Default',
  args: {
    label: 'Topic',
    placeholder: 'Topic',
    required: true,
  },
}

export const HoverState: Story = {
  name: 'State / Hover',
  args: {
    previewState: 'hover',
    label: 'Topic',
    placeholder: 'Topic',
    required: true,
  },
}

export const FocusVisibleState: Story = {
  name: 'State / Focus visible',
  args: {
    previewState: 'focus-visible',
    label: 'Topic',
    placeholder: 'Topic',
    required: true,
  },
}

export const SelectedState: Story = {
  name: 'State / Selected value',
  args: {
    label: 'Category',
    modelValue: 'press-inquiry',
    required: true,
  },
}

export const OpenState: Story = {
  name: 'State / Open interaction',
  render: () => ({
    components: { DsSelect },
    setup() {
      const model = ref('press-inquiry')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const trigger = root.value?.querySelector('button') as HTMLButtonElement | null
        trigger?.click()
      })

      return { model, root, options: SELECT_OPTIONS }
    },
    template: `
      <div
        ref="root"
        class="max-w-xl relative isolate"
        style="min-height: 38rem; padding-bottom: 10rem; overflow: visible;"
      >
        <DsSelect
          id="select-state-open"
          v-model="model"
          label="Request"
          placeholder="Request"
          fill-text="Please choose an option"
          :options="options"
          required
        />
      </div>
    `,
  }),
}

export const ErrorState: Story = {
  name: 'State / Error',
  args: {
    label: 'Request',
    placeholder: 'Request',
    error: 'Please choose a topic.',
    required: true,
  },
}

export const DisabledState: Story = {
  name: 'State / Disabled',
  args: {
    label: 'Audience',
    placeholder: 'Audience',
    disabled: true,
    required: false,
  },
}

export const EmptyState: Story = {
  name: 'State / Empty options',
  render: () => ({
    components: { DsSelect },
    setup() {
      const model = ref('')
      const root = ref<HTMLElement | null>(null)

      onMounted(async () => {
        await nextTick()
        const trigger = root.value?.querySelector('button') as HTMLButtonElement | null
        trigger?.click()
      })

      return { model, root }
    },
    template: `
      <div
        ref="root"
        class="max-w-xl relative isolate"
        style="min-height: 38rem; padding-bottom: 10rem; overflow: visible;"
      >
        <DsSelect
          id="select-state-empty"
          v-model="model"
          label="Topic"
          placeholder="Topic"
          fill-text="Please choose an option"
          empty-text="No entries available"
          :options="[]"
          required
        />
      </div>
    `,
  }),
}

export const ShapeRounded: Story = {
  name: 'Shape / Rounded (default)',
  args: {
    shape: 'rounded',
    label: 'Topic',
    modelValue: 'editorial-feedback',
  },
}

export const ShapePill: Story = {
  name: 'Shape / Pill',
  args: {
    shape: 'pill',
    label: 'Topic',
    modelValue: 'editorial-feedback',
    required: true,
  },
}
