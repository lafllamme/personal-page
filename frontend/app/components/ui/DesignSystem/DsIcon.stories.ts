import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsIconStoryPreview from './DsIconStoryPreview.vue'

const meta = {
  title: 'Design System/Core/Icon',
  component: DsIconStoryPreview,
  tags: ['autodocs'],
  render: () => ({
    components: { DsIconStoryPreview },
    template: '<DsIconStoryPreview />',
  }),
} satisfies Meta<typeof DsIconStoryPreview>

export default meta
type Story = StoryObj<typeof meta>

export const InstalledCollections: Story = {
  name: 'Installed Collections',
}
