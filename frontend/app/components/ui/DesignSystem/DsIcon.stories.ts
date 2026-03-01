import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsIcon from './DsIcon.vue'
import DsIconStoryPalette from './DsIconStoryPalette.vue'
import DsIconStoryPreview from './DsIconStoryPreview.vue'
import DsIconStorySingle from './DsIconStorySingle.vue'
import DsIconStorySizing from './DsIconStorySizing.vue'

const meta = {
  title: 'Design System/Core/Icon',
  component: DsIcon,
  tags: ['autodocs'],
  args: {
    name: 'iconoir:arrow-up-right',
    size: 'md',
    variant: 'default',
    background: false,
  },
  argTypes: {
    name: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'sand', 'accent', 'accent-soft', 'accent-strong'],
    },
    background: { control: 'boolean' },
  },
  render: args => ({
    components: { DsIconStorySingle },
    setup() {
      return { args }
    },
    template: '<DsIconStorySingle v-bind="args" />',
  }),
} satisfies Meta<typeof DsIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Variant / Default',
  args: {
    variant: 'default',
    background: false,
  },
}

export const Background: Story = {
  name: 'Variant / Background',
  args: {
    variant: 'default',
    background: true,
  },
}

export const Palette: Story = {
  name: 'Variant / Palette',
  render: args => ({
    components: { DsIconStoryPalette },
    setup() {
      return { args }
    },
    template: '<DsIconStoryPalette :name="args.name" :size="args.size" />',
  }),
}

export const SizingScale: Story = {
  name: 'Sizing / Scale',
  render: args => ({
    components: { DsIconStorySizing },
    setup() {
      return { args }
    },
    template: '<DsIconStorySizing :name="args.name" :variant="args.variant" :background="args.background" />',
  }),
}

export const InstalledCollections: Story = {
  name: 'Reference / Installed Collections',
  render: () => ({
    components: { DsIconStoryPreview },
    template: '<DsIconStoryPreview />',
  }),
}
