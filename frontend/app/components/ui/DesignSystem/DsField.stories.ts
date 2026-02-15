import { ref } from 'vue'
import type { Meta, StoryObj } from '@nuxtjs/storybook'
import DsField from './DsField.vue'
import DsInput from './DsInput.vue'

const meta = {
  title: 'Design System/Components/DsField',
  component: DsField,
  tags: ['autodocs'],
  args: {
    label: 'Input Label',
    hint: 'Helper text',
    error: '',
    required: false,
    disabled: false,
    forId: 'field-story-input',
  },
  argTypes: {
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: args => ({
    components: { DsField, DsInput },
    setup() {
      const model = ref('')
      return { args, model }
    },
    template: `
      <div class="max-w-md">
        <DsField v-bind="args">
          <DsInput
            :id="args.forId"
            v-model="model"
            :disabled="args.disabled"
            placeholder="Type here"
          />
        </DsField>
      </div>
    `,
  }),
} satisfies Meta<typeof DsField>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const ErrorState: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address.',
    hint: '',
    required: true,
  },
}
