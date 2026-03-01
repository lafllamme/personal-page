import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsLink from './DsLink.vue'
import DsLinkStorySingle from './DsLinkStorySingle.vue'
import DsLinkStorySizing from './DsLinkStorySizing.vue'

const meta = {
  title: 'Design System/Components/DsLink',
  component: DsLink,
  tags: ['autodocs'],
  args: {
    text: 'Read article',
    href: '#',
    variant: 'default',
    size: 'md',
    underline: 'always',
  },
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover'],
    },
  },
  render: args => ({
    components: { DsLinkStorySingle },
    setup() {
      return { args }
    },
    template: '<DsLinkStorySingle v-bind="args" />',
  }),
} satisfies Meta<typeof DsLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: 'Variant / Default',
  args: {
    variant: 'default',
    underline: 'always',
  },
}

export const DefaultHoverUnderline: Story = {
  name: 'Variant / Default Hover Underline',
  args: {
    variant: 'default',
    underline: 'hover',
  },
}

export const Accent: Story = {
  name: 'Variant / Accent',
  args: {
    variant: 'accent',
    underline: 'always',
  },
}

export const AccentHoverUnderline: Story = {
  name: 'Variant / Accent Hover Underline',
  args: {
    variant: 'accent',
    underline: 'hover',
  },
}

export const SizingScale: Story = {
  name: 'Sizing / Scale',
  render: (args, context) => ({
    components: { DsLinkStorySingle, DsLinkStorySizing },
    setup() {
      const showScale = context.viewMode !== 'docs'
      return { args, showScale }
    },
    template: `
      <DsLinkStorySizing
        v-if="showScale"
        :text="args.text"
        :href="args.href"
        :variant="args.variant"
        :underline="args.underline"
      />
      <DsLinkStorySingle
        v-else
        :text="args.text"
        :href="args.href"
        :variant="args.variant"
        :size="args.size"
        :underline="args.underline"
      />
    `,
  }),
}
