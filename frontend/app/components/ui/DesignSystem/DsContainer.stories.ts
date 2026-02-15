import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsContainer from './DsContainer.vue'
import DsSectionContainer from './DsSectionContainer.vue'

const meta = {
  title: 'Design System/Layout/DsContainer',
  component: DsContainer,
  tags: ['autodocs'],
  args: {
    as: 'div',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'section', 'article'],
    },
  },
} satisfies Meta<typeof DsContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: args => ({
    components: { DsContainer, DsSectionContainer },
    setup() {
      return { args }
    },
    template: `
      <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
        <main class="pt-[var(--header-height)]">
          <DsContainer v-bind="args">
            <DsSectionContainer layout="block">
              <p class="space-grotesk-regular text-[10px] tracking-[0.16em] uppercase opacity-65">Container</p>
              <article class="border border-solid border-pureBlack/16 rounded-xl p-5 dark:border-pureWhite/16 md:max-w-2xl">
                <p class="font-manrope text-sm leading-relaxed opacity-80">
                  The design-system layout wraps sections in DsContainer before each DsSectionContainer lane.
                </p>
              </article>
            </DsSectionContainer>
          </DsContainer>
        </main>
      </div>
    `,
  }),
  parameters: {
    layout: 'fullscreen',
  },
}
