import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionContainer from './DsSectionContainer.vue'
import DsLink from './DsLink.vue'

const meta = {
  title: 'Design System/Components/DsLink',
  component: DsLink,
  tags: ['autodocs'],
  args: {
    text: 'Read article',
    href: '#',
    variant: 'default',
    underline: 'always',
  },
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'accent'],
    },
    underline: {
      control: 'select',
      options: ['always', 'hover'],
    },
  },
  render: args => ({
    components: { DsLink, DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block">
          <div class="flex items-center justify-center py-8">
            <DsLink v-bind="args" />
          </div>
        </DsSectionContainer>
      </div>
    `,
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
