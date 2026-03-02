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
    to: '',
    href: '#',
    variant: 'default',
    size: 'md',
    underline: 'always',
    external: false,
  },
  argTypes: {
    text: { control: 'text' },
    to: { control: 'text' },
    href: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'mixed'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover'],
    },
    external: { control: 'boolean' },
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

export const InternalNavigation: Story = {
  name: 'Variant / Internal (NuxtLink)',
  args: {
    to: '/articles',
    href: '#',
    variant: 'default',
    underline: 'always',
  },
}

export const DefaultExternal: Story = {
  name: 'Variant / Default External',
  args: {
    variant: 'default',
    underline: 'always',
    external: true,
  },
}

export const AccentExternal: Story = {
  name: 'Variant / Accent External',
  args: {
    variant: 'accent',
    underline: 'always',
    external: true,
  },
}

export const Mixed: Story = {
  name: 'Variant / Mixed',
  args: {
    variant: 'mixed',
    underline: 'always',
  },
}

export const MixedHoverUnderline: Story = {
  name: 'Variant / Mixed Hover Underline',
  args: {
    variant: 'mixed',
    underline: 'hover',
  },
}

export const MixedExternal: Story = {
  name: 'Variant / Mixed External',
  args: {
    variant: 'mixed',
    underline: 'always',
    external: true,
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
        :external="args.external"
      />
      <DsLinkStorySingle
        v-else
        :text="args.text"
        :to="args.to"
        :href="args.href"
        :variant="args.variant"
        :size="args.size"
        :underline="args.underline"
        :external="args.external"
      />
    `,
  }),
}
