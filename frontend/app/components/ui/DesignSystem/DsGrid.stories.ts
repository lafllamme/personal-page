import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DsGrid from './DsGrid.vue'

const meta = {
  title: 'Foundation/DsGrid',
  component: DsGrid,
  tags: ['autodocs'],
  args: {
    cols: 12,
    gap: 'md',
    align: 'start',
  },
  argTypes: {
    cols: { control: 'select', options: [1, 2, 3, 4, 6, 12] },
    gap: { control: 'select', options: ['sm', 'md', 'lg'] },
    align: { control: 'select', options: ['start', 'center', 'end', 'stretch'] },
  },
} satisfies Meta<typeof DsGrid>

export default meta
type Story = StoryObj<typeof meta>

function cell(label: string): string {
  return `<div class="border border-pureBlack/16 rounded-md border-solid p-3 text-xs dark:border-pureWhite/16">${label}</div>`
}

export const Playground: Story = {
  render: args => ({
    components: { DsGrid },
    setup() {
      return { args }
    },
    template: `<DsGrid v-bind="args">${cell('A')}${cell('B')}${cell('C')}${cell('D')}</DsGrid>`,
  }),
}

export const Variants: Story = {
  render: () => ({
    components: { DsGrid },
    template: `
      <div class="grid gap-5">
        <DsGrid :cols="4" gap="sm">${cell('1')}${cell('2')}${cell('3')}${cell('4')}</DsGrid>
        <DsGrid :cols="3" gap="md">${cell('1')}${cell('2')}${cell('3')}</DsGrid>
        <DsGrid :cols="2" gap="lg">${cell('1')}${cell('2')}</DsGrid>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    template: `
      <article class="text-sm leading-relaxed opacity-80">
        Grid has no interaction states. Validate with content density and breakpoint behavior.
      </article>
    `,
  }),
}

export const DarkMode: Story = {
  render: () => ({
    components: { DsGrid },
    template: `
      <div class="dark bg-pureBlack color-pureWhite p-6">
        <DsGrid :cols="3" gap="md">${cell('A')}${cell('B')}${cell('C')}</DsGrid>
      </div>
    `,
  }),
}

export const A11yNotes: Story = {
  render: () => ({
    template: `
      <article class="max-w-2xl space-y-2 text-sm leading-relaxed">
        <p><strong>Semantics:</strong> grid is presentational, semantic meaning comes from child elements.</p>
        <p><strong>Readability:</strong> avoid overly dense columns for long text.</p>
      </article>
    `,
  }),
}
