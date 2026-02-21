import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import DsSectionContainer from './DsSectionContainer.vue'
import DsTypography from './DsTypography.vue'
import DsTypographyFoundationPreview from './DsTypographyFoundationPreview.vue'

const meta = {
  title: 'Design System/Components/DsTypography',
  component: DsTypography,
  tags: ['autodocs'],
  args: {
    as: 'p',
    role: 'body',
    size: 'md',
    tone: 'default',
    uppercase: false,
  },
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'] },
    role: { control: 'select', options: ['display', 'headline', 'body', 'meta', 'quote', 'signal'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    tone: { control: 'select', options: ['default', 'muted'] },
    uppercase: { control: 'boolean' },
  },
  render: args => ({
    components: { DsTypography },
    setup() {
      return { args }
    },
    template: '<DsTypography v-bind="args">Typography Sample</DsTypography>',
  }),
} satisfies Meta<typeof DsTypography>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const DesignSystemSection: Story = {
  render: () => ({
    components: { DsSectionContainer, DsTypography },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <DsSectionContainer layout="block">
          <div class="mb-7">
            <p class="space-grotesk-regular text-[10px] tracking-[0.18em] uppercase opacity-65">
              foundation
            </p>
            <h2 class="font-clash-regular mt-2 text-[clamp(1.45rem,2.6vw,2.35rem)] leading-tight">
              Typography
            </h2>
          </div>

          <article class="border border-pureBlack/16 rounded-xl border-solid p-5 dark:border-pureWhite/16">
            <div class="grid gap-4 md:grid-cols-2">
              <div class="grid gap-2">
                <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
                  display
                </DsTypography>
                <DsTypography as="h2" role="display" size="3xl" uppercase>
                  Signal Desk
                </DsTypography>
              </div>

              <div class="grid gap-2">
                <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
                  headline
                </DsTypography>
                <DsTypography as="h3" role="headline" size="2xl" uppercase>
                  Editorial hierarchy stays strict
                </DsTypography>
              </div>

              <div class="grid gap-2">
                <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
                  body
                </DsTypography>
                <DsTypography as="p" role="body" size="md">
                  Teams evaluate AI systems not only by quality, but by auditability, rollback speed, and operational clarity.
                </DsTypography>
              </div>

              <div class="grid gap-2">
                <DsTypography as="p" role="meta" size="xs" tone="muted" uppercase>
                  quote + signal
                </DsTypography>
                <DsTypography as="blockquote" role="quote" size="lg">
                  “Consistency is not visual sameness, it is predictable decision flow.”
                </DsTypography>
                <DsTypography as="p" role="signal" size="sm" uppercase>
                  Market Pulse 64
                </DsTypography>
              </div>
            </div>
          </article>
        </DsSectionContainer>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}

export const FoundationMatrix: Story = {
  name: 'Foundation Matrix',
  render: () => ({
    render() {
      return h(DsTypographyFoundationPreview)
    },
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
