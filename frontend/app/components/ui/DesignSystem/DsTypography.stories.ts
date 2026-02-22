import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { h } from 'vue'
import DsSectionContainer from './DsSectionContainer.vue'
import DsTypography from './DsTypography.vue'
import DsTypographyFoundationPreview from './DsTypographyFoundationPreview.vue'

const TYPO_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const SAMPLE_TEXT = {
  display: 'Swiss Editorial Signal',
  headline: 'Asymmetric composition and rhythm.',
  body: 'Readable paragraph text for long-form content.',
  meta: 'token / scale / spacing',
  quote: 'Design is clarity.',
  signal: 'Status channel active',
} as const

function createScaleStory(
  role: 'display' | 'headline' | 'body' | 'meta' | 'quote' | 'signal',
  as: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote',
){
  return {
    args: {
      role,
      as,
    },
    render: (args: Record<string, unknown>) => ({
      components: { DsSectionContainer, DsTypography },
      setup() {
        return {
          args,
          role,
          sample: SAMPLE_TEXT[role],
          sizes: TYPO_SIZES,
        }
      },
      template: `
        <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
          <DsSectionContainer layout="block">
            <div class="space-y-5">
              <div
                v-for="size in sizes"
                :key="size"
                class="border border-pureBlack/14 rounded-xl border-solid p-4 dark:border-pureWhite/16"
              >
                <DsTypography as="p" role="meta" size="xs" tone="muted">
                  {{ role }} / {{ size }} • type-{{ role }}-{{ size }}
                </DsTypography>
                <DsTypography
                  v-bind="args"
                  :role="role"
                  :size="size"
                >
                  {{ sample }}
                </DsTypography>
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
}

const meta = {
  title: 'Design System/Components/DsTypography',
  component: DsTypography,
  tags: ['autodocs'],
  args: {
    as: 'p',
    role: 'body',
    size: 'md',
    tone: 'default',
    weight: 'auto',
    uppercase: false,
  },
  argTypes: {
    as: { control: 'select', options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'] },
    role: { control: 'select', options: ['display', 'headline', 'body', 'meta', 'quote', 'signal'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
    tone: { control: 'select', options: ['default', 'muted'] },
    weight: {
      control: 'select',
      options: [
        'auto',
        'thin',
        'extralight',
        'light',
        'regular',
        'medium',
        'semibold',
        'bold',
        'extrabold',
        'black',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
      ],
    },
    uppercase: { control: 'boolean' },
    italic: {
      control: 'select',
      options: ['auto', true, false],
      mapping: { auto: undefined, true: true, false: false },
    },
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

export const DisplayScale: Story = createScaleStory('display', 'h1')
export const HeadlineScale: Story = createScaleStory('headline', 'h2')
export const BodyScale: Story = createScaleStory('body', 'p')
export const MetaScale: Story = createScaleStory('meta', 'p')
export const QuoteScale: Story = createScaleStory('quote', 'blockquote')
export const SignalScale: Story = createScaleStory('signal', 'p')

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
