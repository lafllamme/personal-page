import type { Meta, StoryObj } from '@nuxtjs/storybook'
import DsButton from './DsButton.vue'

const meta = {
  title: 'Design System/Components/DsButton',
  component: DsButton,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    previewState: 'default',
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'quartery', 'quaternary'],
    },
    previewState: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus-visible'],
    },
    disabled: { control: 'boolean' },
  },
  render: args => ({
    components: { DsButton },
    setup() {
      return { args }
    },
    template: '<DsButton v-bind="args">Click Me</DsButton>',
  }),
} satisfies Meta<typeof DsButton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Matrix: Story = {
  render: () => ({
    components: { DsButton },
    template: `
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${['primary', 'secondary', 'tertiary', 'quartery']
            .map(variant => `
              <section class="border border-solid border-pureBlack/12 rounded-lg p-3 dark:border-pureWhite/12">
                <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-70">${variant}</p>
                <div class="mt-3 flex flex-col items-start gap-2">
                  <DsButton variant="${variant}">Click Me</DsButton>
                  <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">hover</p>
                  <DsButton variant="${variant}" preview-state="hover">Click Me</DsButton>
                  <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">active</p>
                  <DsButton variant="${variant}" preview-state="active">Click Me</DsButton>
                  <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">focus-visible</p>
                  <DsButton variant="${variant}" preview-state="focus-visible">Click Me</DsButton>
                  <p class="space-grotesk-regular text-[10px] tracking-[0.14em] uppercase opacity-60">disabled</p>
                  <DsButton variant="${variant}" disabled>Click Me</DsButton>
                </div>
              </section>
            `)
            .join('')}
        </div>
      </div>
    `,
  }),
}
