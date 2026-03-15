import { expect, test } from '@playwright/test'
import { readFileSync } from 'node:fs'
import path from 'node:path'

interface StoryIndexEntry {
  id: string
  title: string
  name: string
  type: 'docs' | 'story'
}

interface StoryIndex {
  entries: Record<string, StoryIndexEntry>
}

const storybookBaseUrl = 'http://127.0.0.1:6007'
const storybookIndexPath = path.resolve('storybook-static/index.json')

function slugifyStoryId(storyId: string): string {
  return storyId.replace(/[^a-zA-Z0-9_-]+/g, '-')
}

function loadDesignSystemStories(): StoryIndexEntry[] {
  const raw = readFileSync(storybookIndexPath, 'utf8')
  const parsed = JSON.parse(raw) as StoryIndex

  return Object.values(parsed.entries)
    .filter(entry => entry.type === 'story' && entry.title.startsWith('Design System/'))
    .sort((a, b) => a.title.localeCompare(b.title) || a.name.localeCompare(b.name))
}

const stories = loadDesignSystemStories()

test.describe('Storybook visual regression (Design System)', () => {
  for (const story of stories) {
    test(`${story.title} / ${story.name}`, async ({ page }) => {
      const storyUrl = `${storybookBaseUrl}/iframe.html?id=${story.id}&viewMode=story`

      await page.goto(storyUrl, { waitUntil: 'networkidle' })
      await page.waitForLoadState('domcontentloaded')
      await page.evaluate(async () => {
        // Wait for web fonts so snapshots stay stable.
        await document.fonts.ready
      })
      await page.waitForTimeout(120)

      await expect(page).toHaveScreenshot(`${slugifyStoryId(story.id)}.png`, {
        fullPage: true,
      })
    })
  }
})
