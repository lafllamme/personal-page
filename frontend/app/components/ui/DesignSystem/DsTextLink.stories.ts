import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsSectionContainer from './DsSectionContainer.vue'
import DsTextLink from './DsTextLink.vue'
import DsTypography from './DsTypography.vue'

const meta = {
  title: 'Design System/Components/DsTextLink',
  component: DsTextLink,
  tags: ['autodocs'],
  args: {
    text: 'Read article',
    href: '#',
    underline: 'always',
  },
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
    underline: {
      control: 'select',
      options: ['always', 'hover'],
    },
  },
  render: args => ({
    components: { DsTextLink, DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block">
          <div class="flex items-center justify-center py-8">
            <DsTextLink v-bind="args" />
          </div>
        </DsSectionContainer>
      </div>
    `,
  }),
} satisfies Meta<typeof DsTextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const AlwaysUnderline: Story = {
  name: 'Default / Always Underline',
  args: {
    underline: 'always',
  },
}

export const HoverUnderline: Story = {
  name: 'Variant / Hover Underline',
  args: {
    underline: 'hover',
  },
}

export const ContextComparison: Story = {
  name: 'Context Comparison',
  render: args => ({
    components: { DsSectionContainer, DsTextLink, DsTypography },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block">
          <div class="grid gap-8 md:grid-cols-2">
            <div class="space-y-3 border border-pureBlack/14 rounded-xl border-solid p-4 dark:border-pureWhite/16">
              <DsTypography as="p" role="meta" size="xs" uppercase>Post Content</DsTypography>
              <DsTypography as="p" role="body" size="md">
                This paragraph includes a <DsTextLink :href="args.href" :text="args.text" underline="always" /> inline link for immediate recognition.
              </DsTypography>
            </div>
            <div class="space-y-3 border border-pureBlack/14 rounded-xl border-solid p-4 dark:border-pureWhite/16">
              <DsTypography as="p" role="meta" size="xs" uppercase>Footer/Nav</DsTypography>
              <div class="flex flex-col items-start gap-3">
                <DsTextLink :href="args.href" text="About" underline="hover" />
                <DsTextLink :href="args.href" text="Resources" underline="hover" />
                <DsTextLink :href="args.href" text="Contact" underline="hover" />
              </div>
            </div>
          </div>
        </DsSectionContainer>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

