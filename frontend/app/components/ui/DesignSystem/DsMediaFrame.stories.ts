import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsMediaFrame from './DsMediaFrame.vue'

const mediaImages = [
  'https://i.imgur.com/o8ch4y7.jpeg',
  'https://i.imgur.com/Nd4xs6g.jpeg',
  'https://i.imgur.com/zMvrbgk.jpeg',
  'https://i.imgur.com/ej73kzL.jpeg',
  'https://i.imgur.com/GSwURfo.jpeg',
] as const

const meta = {
  title: 'Foundation/DsMediaFrame',
  component: DsMediaFrame,
  tags: ['autodocs'],
  args: {
    src: mediaImages[0],
    alt: 'Editorial image sample',
    ratio: '16/9',
    caption: 'Editorial cover frame',
  },
  argTypes: {
    ratio: { control: 'select', options: ['16/9', '4/3', '3/2', '1/1'] },
  },
} satisfies Meta<typeof DsMediaFrame>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: () => ({
    components: { DsMediaFrame },
    setup() {
      return { mediaImages }
    },
    template: `
      <div class="grid gap-4 md:grid-cols-2">
        <DsMediaFrame :src="mediaImages[0]" ratio="16/9" caption="16/9" />
        <DsMediaFrame :src="mediaImages[1]" ratio="4/3" caption="4/3" />
        <DsMediaFrame :src="mediaImages[2]" ratio="3/2" caption="3/2" />
        <DsMediaFrame :src="mediaImages[3]" ratio="1/1" caption="1/1" />
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    template: `
      <article class="text-sm leading-relaxed opacity-80">
        MediaFrame has content states only: image present vs placeholder fallback.
      </article>
    `,
  }),
}

export const DarkMode: Story = {
  render: () => ({
    components: { DsMediaFrame },
    setup() {
      return { mediaImages }
    },
    template: `
      <div class="dark bg-pureBlack color-pureWhite p-6">
        <DsMediaFrame :src="mediaImages[4]" ratio="16/9" caption="Dark surface example" />
      </div>
    `,
  }),
}

export const A11yNotes: Story = {
  render: () => ({
    template: `
      <article class="max-w-2xl space-y-2 text-sm leading-relaxed">
        <p><strong>Alt text:</strong> always provide descriptive alt for informative images.</p>
        <p><strong>Caption:</strong> use caption for context, not duplicate alt text.</p>
      </article>
    `,
  }),
}
