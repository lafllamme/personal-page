<script setup lang="ts">
import { computed, ref } from 'vue'
import DsBadge from '@/components/ui/DesignSystem/DsBadge.vue'
import DsButton from '@/components/ui/DesignSystem/DsButton.vue'
import DsCheckbox from '@/components/ui/DesignSystem/DsCheckbox.vue'
import DsInput from '@/components/ui/DesignSystem/DsInput.vue'
import DsLink from '@/components/ui/DesignSystem/DsLink.vue'
import DsRadio from '@/components/ui/DesignSystem/DsRadio.vue'
import DsSectionBody from '@/components/ui/DesignSystem/DsSectionBody.vue'
import DsSectionShell from '@/components/ui/DesignSystem/DsSectionShell.vue'
import DsSelect from '@/components/ui/DesignSystem/DsSelect.vue'
import DsSwitch from '@/components/ui/DesignSystem/DsSwitch.vue'
import DsTextarea from '@/components/ui/DesignSystem/DsTextarea.vue'
import DsTypography from '@/components/ui/DesignSystem/DsTypography.vue'

definePageMeta({
  layout: 'design-system',
})

useHead({
  title: 'Design System Debug - Container & Spacing',
})

const typoSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

const typoRoleMatrix = [
  { role: 'display', label: 'Display', sample: 'Swiss Editorial System', uppercase: true },
  { role: 'headline', label: 'Headline', sample: 'Asymmetric composition and rhythm.', uppercase: false },
  { role: 'body', label: 'Body', sample: 'Readable paragraph text for long-form content.', uppercase: false },
  { role: 'meta', label: 'Meta', sample: 'token / scale / spacing', uppercase: true },
  { role: 'quote', label: 'Quote', sample: 'Design is clarity.', uppercase: false },
  { role: 'signal', label: 'Signal', sample: 'Status channel active', uppercase: false },
] as const

function tokenLabel(role: string, size: string) {
  return `text-$type-${role}-${size}`
}

const inputDefaultValue = ref('')
const inputFloatValue = ref('')
const inputUnderlineValue = ref('')
const inputBorderDrawValue = ref('')
const inputPillValue = ref('')
const articleSummary = ref('')
const articleSummaryTouched = ref(false)
const selectTopic = ref('')
const selectSelected = ref('product')
const selectInvalid = ref('')

const selectTopicTouched = ref(false)
const selectInvalidTouched = ref(false)
const selectEmpty = ref('')
const checkboxDefault = ref<boolean>(false)
const checkboxAccent = ref<boolean>(false)
const checkboxMixed = ref<boolean>(false)
const checkboxSizeSm = ref<boolean>(false)
const checkboxSizeMd = ref<boolean>(true)
const checkboxSizeLg = ref<boolean>(false)
const checkboxRequired = ref<boolean>(false)
const checkboxRequiredErrorPreview = ref<boolean>(false)
const radioDefault = ref('')
const radioAccent = ref('product')
const radioMixed = ref('community')
const radioSizeSm = ref('')
const radioSizeMd = ref('product')
const radioSizeLg = ref('community')
const radioRequired = ref('')
const switchDefault = ref<boolean>(false)
const switchAccent = ref<boolean>(true)
const switchMixed = ref<boolean>(false)
const switchSizeSm = ref<boolean>(false)
const switchSizeMd = ref<boolean>(true)
const switchSizeLg = ref<boolean>(false)
const switchRequired = ref<boolean>(false)

const selectOptions = [
  { label: 'Editorial feedback', value: 'editorial' },
  { label: 'Product question', value: 'product' },
  { label: 'Partnership request', value: 'partnership' },
  { label: 'Press inquiry', value: 'press' },
  { label: 'Community support', value: 'community' },
]
const selectEmptyOptions: { label: string, value: string }[] = []
const radioOptions = [
  { label: 'Editorial feedback', value: 'editorial' },
  { label: 'Product question', value: 'product' },
  { label: 'Community support', value: 'community' },
]

const articleSummaryError = computed(() => {
  if (!articleSummaryTouched.value)
    return ''

  if (articleSummary.value.trim().length < 30)
    return 'Please write at least 30 characters.'

  return ''
})

const selectInvalidError = computed(() => {
  if (!selectInvalidTouched.value)
    return ''

  if (!selectInvalid.value)
    return 'Please choose a topic.'

  return ''
})

type BadgeSoftCandidate = {
  id: string
  name: string
  label: string
  bgStep: number
  textStep: number
  borderStep: number
  note: string
}

const toxicLightScale: Record<number, string> = {
  1: '#fafefd',
  2: '#f3fbf9',
  3: '#e0f8f3',
  4: '#ccf3ea',
  5: '#b8eae0',
  6: '#a1ded2',
  7: '#83cdc1',
  8: '#53b9ab',
  9: '#12a594',
  10: '#0d9b8a',
  11: '#008573',
  12: '#0d3d38',
}

const toxicDarkScale: Record<number, string> = {
  1: '#0d1514',
  2: '#111c1b',
  3: '#0d2d2a',
  4: '#023b37',
  5: '#084843',
  6: '#145750',
  7: '#1c6961',
  8: '#207e73',
  9: '#12a594',
  10: '#0eb39e',
  11: '#0bd8b6',
  12: '#adf0dd',
}

const accentSoftCandidates: BadgeSoftCandidate[] = [
  {
    id: 'a',
    name: 'A / Balanced Editorial',
    label: 'Update',
    bgStep: 4,
    textStep: 12,
    borderStep: 6,
    note: 'Current baseline with a slightly stronger border.',
  },
  {
    id: 'b',
    name: 'B / Crisp Contrast',
    label: 'Update',
    bgStep: 3,
    textStep: 12,
    borderStep: 7,
    note: 'Lighter surface, sharper text separation.',
  },
  {
    id: 'c',
    name: 'C / Denser Soft',
    label: 'Update',
    bgStep: 5,
    textStep: 12,
    borderStep: 7,
    note: 'More body in the surface while preserving clarity.',
  },
  {
    id: 'd',
    name: 'D / Inverse Quiet',
    label: 'Update',
    bgStep: 12,
    textStep: 3,
    borderStep: 11,
    note: 'Dark toxic plate with soft mint text.',
  },
  {
    id: 'e',
    name: 'E / Inverse Dense',
    label: 'Update',
    bgStep: 12,
    textStep: 2,
    borderStep: 10,
    note: 'Heavier editorial feel, slightly calmer than D.',
  },
  {
    id: 'f',
    name: 'F / Premium Deep',
    label: 'Update',
    bgStep: 12,
    textStep: 1,
    borderStep: 9,
    note: 'Max dark-luxury direction with strongest contrast.',
  },
]

function toRgb(hex: string) {
  const normalized = hex.replace('#', '')
  const value = Number.parseInt(normalized, 16)
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  }
}

function linearize(channel: number) {
  const s = channel / 255
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function luminance(hex: string) {
  const { r, g, b } = toRgb(hex)
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
}

function contrastRatio(fgHex: string, bgHex: string) {
  const l1 = luminance(fgHex)
  const l2 = luminance(bgHex)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function ratioToLevel(ratio: number) {
  if (ratio >= 7)
    return 'AAA'
  if (ratio >= 4.5)
    return 'AA'
  return 'fail'
}

const accentSoftCandidateStats = computed(() => {
  return accentSoftCandidates.map((candidate) => {
    const lightRatio = contrastRatio(
      toxicLightScale[candidate.textStep],
      toxicLightScale[candidate.bgStep],
    )
    const darkRatio = contrastRatio(
      toxicDarkScale[candidate.textStep],
      toxicDarkScale[candidate.bgStep],
    )

    return {
      ...candidate,
      lightRatio: lightRatio.toFixed(2),
      darkRatio: darkRatio.toFixed(2),
      lightLevel: ratioToLevel(lightRatio),
      darkLevel: ratioToLevel(darkRatio),
    }
  })
})

function badgeSoftStyle(candidate: BadgeSoftCandidate) {
  return {
    '--ds-badge-soft-bg': `var(--toxic-${candidate.bgStep})`,
    '--ds-badge-soft-border': `var(--toxic-${candidate.borderStep})`,
    '--ds-badge-soft-text': `var(--toxic-${candidate.textStep})`,
    '--ds-badge-dot': `var(--toxic-${candidate.textStep})`,
  }
}
</script>

<template>
  <div class="bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <DsSectionShell
      as="header"
      spacing="md"
      :debug="true"
    >
      <DsSectionBody :debug="true">
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Debug Page
          </DsTypography>
          <DsTypography
            as="h1"
            role="headline"
            size="2xl"
            uppercase
          >
            Container + Spacing Forge
          </DsTypography>
          <DsTypography
            as="p"
            role="body"
            size="md"
            tone="muted"
          >
            Diese Seite zeigt bewusst nur Container/Section/Button-Grundlagen mit aktiven Debug-Outlines.
          </DsTypography>

          <div class="flex flex-wrap items-center gap-4">
            <DsLink
              to="/design-system"
              text="Interner Link Test"
              variant="default"
              underline="hover"
            />
            <DsLink
              href="https://example.com"
              text="Externer Link Test"
              variant="accent"
              underline="always"
              external
            />
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="false"
    >
      <DsSectionBody
        max="7xl"
        gutter="md"
        :debug="false"
      >
        <div class="mb-8 p-4 space-y-6 md:p-5">
          <div class="input-form-study space-y-4">
            <DsInput
              id="debug-form-subject"
              v-model="formSubject"
              variant="floating"
              label="Subject"
              fill-text="Choose a subject"
              required
            />

            <div class="grid gap-5 lg:grid-cols-2">
              <DsInput
                id="debug-form-first-name"
                v-model="formFirstName"
                variant="floating"
                label="First name"
                fill-text="Given"
                required
              />

              <DsInput
                id="debug-form-last-name"
                v-model="formLastName"
                variant="floating"
                label="Last name"
                fill-text="Family"
                required
              />
            </div>

            <div class="grid gap-5 lg:grid-cols-2">
              <DsInput
                id="debug-form-email"
                v-model="formEmail"
                type="email"
                variant="floating"
                label="Email"
                fill-text="name@domain.com"
                required
              />

              <DsInput
                id="debug-form-phone"
                v-model="formPhone"
                type="tel"
                variant="floating"
                label="Phone"
                fill-text="+49 000 000000"
              />
            </div>

            <div class="pt-2 space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="2xs"
                uppercase
                tone="muted"
              >
                Read-only Preview
              </DsTypography>
              <div class="grid gap-5 lg:grid-cols-2">
                <DsInput
                  id="debug-form-readonly-handle"
                  v-model="formReadonlyHandle"
                  variant="floating"
                  label="Status"
                  readonly
                />
                <DsInput
                  id="debug-form-readonly-email"
                  v-model="formReadonlyEmail"
                  variant="floating"
                  type="email"
                  label="Owner email"
                  readonly
                />
              </div>
            </div>
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Textarea Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Same font contract as input: meta label + body content. Large editorial surface with counter.
              </DsTypography>
            </div>

            <DsTextarea
              id="debug-textarea-prototype-a"
              v-model="articleSummary"
              label="Article summary"
              fill-text="Write a concise summary for publication."
              hint="Keep it punchy and readable for the front page."
              :max-length="2000"
              required
              @blur="articleSummaryTouched = true"
            />

            <DsTextarea
              id="debug-textarea-prototype-a-error"
              v-model="articleSummary"
              label="Article summary (validated)"
              fill-text="At least 30 characters."
              :error="articleSummaryError"
              :max-length="2000"
              required
              @blur="articleSummaryTouched = true"
            />
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Select Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Custom listbox with clip-curtain reveal and floating label parity to input/textarea.
              </DsTypography>
            </div>

            <div class="grid gap-5 lg:grid-cols-2">
              <DsSelect
                id="debug-select-default"
                v-model="selectTopic"
                placeholder="Topic"
                fill-text="Choose a topic"
                :options="selectOptions"
                hint="Default interactive state. Open to inspect overlay transition."
                required
                @blur="selectTopicTouched = true"
              />

              <DsSelect
                id="debug-select-selected"
                v-model="selectSelected"
                placeholder="Category"
                fill-text="Pick one category"
                :options="selectOptions"
                hint="Selected state preview."
              />

              <DsSelect
                id="debug-select-invalid"
                v-model="selectInvalid"
                placeholder="Request"
                fill-text="Select request type"
                :options="selectOptions"
                :error="selectInvalidError"
                required
                @blur="selectInvalidTouched = true"
              />

              <DsSelect
                id="debug-select-disabled"
                model-value=""
                placeholder="Audience"
                fill-text="Choose audience"
                :options="selectOptions"
                hint="Disabled state preview."
                disabled
              />

              <DsSelect
                id="debug-select-empty"
                v-model="selectEmpty"
                placeholder="Channel"
                fill-text="Choose a channel"
                empty-text="No entries available"
                :options="selectEmptyOptions"
                hint="Empty state preview."
              />
            </div>
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Checkbox Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Default, accent, and mixed variants with subtle scale interaction and animated indicator.
              </DsTypography>
            </div>

            <div class="space-y-5">
              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Variants (Medium)
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsCheckbox
                    id="debug-checkbox-default"
                    v-model="checkboxDefault"
                    variant="default"
                    size="md"
                    label="Primary (default)"
                  />

                  <DsCheckbox
                    id="debug-checkbox-accent"
                    v-model="checkboxAccent"
                    variant="accent"
                    size="md"
                    label="Accent"
                  />

                  <DsCheckbox
                    id="debug-checkbox-mixed"
                    v-model="checkboxMixed"
                    variant="mixed"
                    size="md"
                    label="Mixed"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Sizes
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsCheckbox
                    id="debug-checkbox-size-sm"
                    v-model="checkboxSizeSm"
                    variant="default"
                    size="sm"
                    label="Small"
                  />

                  <DsCheckbox
                    id="debug-checkbox-size-md"
                    v-model="checkboxSizeMd"
                    variant="default"
                    size="md"
                    label="Medium"
                  />

                  <DsCheckbox
                    id="debug-checkbox-size-lg"
                    v-model="checkboxSizeLg"
                    variant="default"
                    size="lg"
                    label="Large"
                  />
                </div>
              </div>

              <div class="grid gap-5 lg:grid-cols-2">
                <DsCheckbox
                  id="debug-checkbox-disabled"
                  :model-value="true"
                  variant="default"
                  size="md"
                  label="Disabled selected state"
                  hint="Disabled contract preview."
                  disabled
                />

                <DsCheckbox
                  id="debug-checkbox-required"
                  v-model="checkboxRequired"
                  variant="default"
                  size="md"
                  label="Required agreement"
                  hint="Blur without selection to inspect error shake."
                  required
                />

                <DsCheckbox
                  id="debug-checkbox-required-error"
                  v-model="checkboxRequiredErrorPreview"
                  variant="default"
                  size="md"
                  label="Required (error preview)"
                  hint="Forced error state preview."
                  required
                  invalid
                  error="Please confirm this field."
                />
              </div>
            </div>
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Radio Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Base-radio style: neutral ring plus animated dot, no filled control background.
              </DsTypography>
            </div>

            <div class="space-y-5">
              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Variants (Medium)
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsRadio
                    id="debug-radio-default"
                    v-model="radioDefault"
                    variant="default"
                    size="md"
                    label="Default variant"
                    :options="radioOptions"
                  />

                  <DsRadio
                    id="debug-radio-accent"
                    v-model="radioAccent"
                    variant="accent"
                    size="md"
                    label="Accent variant"
                    :options="radioOptions"
                  />

                  <DsRadio
                    id="debug-radio-mixed"
                    v-model="radioMixed"
                    variant="mixed"
                    size="md"
                    label="Mixed variant"
                    :options="radioOptions"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Sizes
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsRadio
                    id="debug-radio-size-sm"
                    v-model="radioSizeSm"
                    variant="default"
                    size="sm"
                    label="Small"
                    :options="radioOptions"
                  />

                  <DsRadio
                    id="debug-radio-size-md"
                    v-model="radioSizeMd"
                    variant="default"
                    size="md"
                    label="Medium"
                    :options="radioOptions"
                  />

                  <DsRadio
                    id="debug-radio-size-lg"
                    v-model="radioSizeLg"
                    variant="default"
                    size="lg"
                    label="Large"
                    :options="radioOptions"
                  />
                </div>
              </div>

              <div class="grid gap-5 lg:grid-cols-2">
                <DsRadio
                  id="debug-radio-required"
                  v-model="radioRequired"
                  variant="default"
                  size="md"
                  label="Required topic"
                  hint="Blur the group without selection to inspect error shake."
                  :options="radioOptions"
                  required
                />

                <DsRadio
                  id="debug-radio-disabled"
                  model-value="product"
                  variant="default"
                  size="md"
                  label="Disabled selected"
                  hint="Disabled contract preview."
                  :options="radioOptions"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Switch Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Clean track/thumb toggle with spring thumb press and shared field error pattern.
              </DsTypography>
            </div>

            <div class="space-y-5">
              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Variants (Medium)
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsSwitch
                    id="debug-switch-default"
                    v-model="switchDefault"
                    variant="default"
                    size="md"
                    label="Default variant"
                  />

                  <DsSwitch
                    id="debug-switch-accent"
                    v-model="switchAccent"
                    variant="accent"
                    size="md"
                    label="Accent variant"
                  />

                  <DsSwitch
                    id="debug-switch-mixed"
                    v-model="switchMixed"
                    variant="mixed"
                    size="md"
                    label="Mixed variant"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <DsTypography
                  as="p"
                  role="meta"
                  size="2xs"
                  uppercase
                >
                  Sizes
                </DsTypography>
                <div class="grid gap-5 lg:grid-cols-3">
                  <DsSwitch
                    id="debug-switch-size-sm"
                    v-model="switchSizeSm"
                    variant="default"
                    size="sm"
                    label="Small"
                  />

                  <DsSwitch
                    id="debug-switch-size-md"
                    v-model="switchSizeMd"
                    variant="default"
                    size="md"
                    label="Medium"
                  />

                  <DsSwitch
                    id="debug-switch-size-lg"
                    v-model="switchSizeLg"
                    variant="default"
                    size="lg"
                    label="Large"
                  />
                </div>
              </div>

              <div class="grid gap-5 lg:grid-cols-2">
                <DsSwitch
                  id="debug-switch-required"
                  v-model="switchRequired"
                  variant="default"
                  size="md"
                  label="Required toggle"
                  hint="Blur without turning it on to inspect error shake."
                  required
                />

                <DsSwitch
                  id="debug-switch-disabled"
                  :model-value="true"
                  variant="default"
                  size="md"
                  label="Disabled selected"
                  hint="Disabled contract preview."
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="pt-3 space-y-4">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Badge Prototype A
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Read-only label primitive with variant/type matrix and optional signal helpers.
              </DsTypography>
            </div>

            <div class="space-y-4">
              <DsTypography as="p" role="meta" size="2xs" uppercase>
                Variant x Type
              </DsTypography>
              <div class="grid gap-4 lg:grid-cols-3">
                <div class="space-y-3">
                  <DsTypography as="p" role="meta" size="2xs" uppercase tone="muted">
                    Default
                  </DsTypography>
                  <div class="flex flex-wrap gap-2">
                    <DsBadge text="Editorial" variant="default" type="solid" />
                    <DsBadge text="Outline" variant="default" type="outline" />
                    <DsBadge text="Soft" variant="default" type="soft" />
                    <DsBadge text="Crisp" variant="default" type="crisp" />
                  </div>
                </div>

                <div class="space-y-3">
                  <DsTypography as="p" role="meta" size="2xs" uppercase tone="muted">
                    Accent
                  </DsTypography>
                  <div class="flex flex-wrap gap-2">
                    <DsBadge text="Release" variant="accent" type="solid" />
                    <DsBadge text="Signal" variant="accent" type="outline" />
                    <DsBadge text="Update" variant="accent" type="soft" />
                    <DsBadge text="Crisp" variant="accent" type="crisp" />
                  </div>
                </div>

                <div class="space-y-3">
                  <DsTypography as="p" role="meta" size="2xs" uppercase tone="muted">
                    Mixed
                  </DsTypography>
                  <div class="flex flex-wrap gap-2">
                    <DsBadge text="Neutral + Accent" variant="mixed" type="solid" dot />
                    <DsBadge text="Hybrid" variant="mixed" type="outline" dot />
                    <DsBadge text="Context" variant="mixed" type="soft" dot />
                    <DsBadge text="Crisp Mix" variant="mixed" type="crisp" dot />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-3">
              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Sizes
                </DsTypography>
                <div class="flex flex-wrap items-center gap-2">
                  <DsBadge text="SM badge" size="sm" />
                  <DsBadge text="MD badge" size="md" />
                </div>
              </div>

              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Rounded
                </DsTypography>
                <div class="flex flex-wrap gap-2">
                  <DsBadge text="Rounded SM" size="sm" shape="rounded" variant="default" type="outline" />
                  <DsBadge text="Rounded MD" size="md" shape="rounded" variant="accent" type="soft" />
                  <DsBadge text="Rounded Crisp" size="md" shape="rounded" variant="accent" type="crisp" />
                </div>
              </div>

              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Dot + Icon
                </DsTypography>
                <div class="flex flex-wrap gap-2">
                  <DsBadge text="Live" variant="accent" type="soft" dot />
                  <DsBadge text="Curated" variant="mixed" type="outline" icon="iconoir:star-solid" />
                </div>
              </div>

              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Disabled
                </DsTypography>
                <div class="flex flex-wrap gap-2">
                  <DsBadge text="Disabled" variant="default" type="solid" disabled />
                  <DsBadge text="Disabled Accent" variant="accent" type="outline" disabled />
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <DsTypography as="p" role="meta" size="2xs" uppercase>
                Accent Soft Exploration (WCAG)
              </DsTypography>
              <DsTypography as="p" role="meta" size="2xs" tone="muted">
                6 toxic combinations for soft accent badges. Ratios are text vs badge background.
              </DsTypography>
              <div class="grid gap-3 xl:grid-cols-2">
                <div
                  v-for="candidate in accentSoftCandidateStats"
                  :key="candidate.id"
                  class="space-y-2 rounded-lg border border-pureBlack/14 border-solid p-3 dark:border-pureWhite/14"
                >
                  <DsTypography as="p" role="meta" size="2xs" uppercase>
                    {{ candidate.name }}
                  </DsTypography>
                  <div class="flex flex-wrap items-center gap-2">
                    <DsBadge
                      :text="candidate.label"
                      variant="accent"
                      type="soft"
                      dot
                      :style="badgeSoftStyle(candidate)"
                    />
                    <DsBadge
                      text="Rounded MD"
                      variant="accent"
                      type="soft"
                      shape="rounded"
                      :style="badgeSoftStyle(candidate)"
                    />
                  </div>
                  <DsTypography as="p" role="meta" size="2xs" tone="muted">
                    bg toxic-{{ candidate.bgStep }} · text toxic-{{ candidate.textStep }} · border toxic-{{ candidate.borderStep }}
                  </DsTypography>
                  <DsTypography as="p" role="meta" size="2xs" tone="muted">
                    Light {{ candidate.lightRatio }}:1 ({{ candidate.lightLevel }}) · Dark {{ candidate.darkRatio }}:1 ({{ candidate.darkLevel }})
                  </DsTypography>
                  <DsTypography as="p" role="meta" size="2xs" tone="muted">
                    {{ candidate.note }}
                  </DsTypography>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <DsTypography as="p" role="meta" size="2xs" uppercase>
                Animated (Experimental)
              </DsTypography>
              <div class="flex flex-wrap gap-2">
                <DsBadge text="Shimmer" variant="accent" type="soft" animation="shimmer" />
                <DsBadge text="Beam" variant="accent" type="outline" animation="beam" />
              </div>
            </div>
          </div>

          <div class="pt-3 space-y-6">
            <div class="space-y-2">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Input Variants Study
              </DsTypography>
              <DsTypography
                as="p"
                role="body"
                size="sm"
                tone="muted"
              >
                Debug-only exploration for interaction direction. These are not final DS variants yet.
              </DsTypography>
            </div>

            <div class="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              <div class="input-study-card">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Default Minimal
                </DsTypography>
                <label class="input-study-field">
                  <span class="input-study-label">Full Name</span>
                  <input
                    v-model="inputDefaultValue"
                    class="input-study-control"
                    type="text"
                    placeholder="Ada Lovelace"
                  >
                </label>
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Single focus border with a restrained shell.
                </DsTypography>
              </div>

              <div class="input-study-card">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Floating Label
                </DsTypography>
                <DsInput
                  id="debug-study-floating"
                  v-model="inputFloatValue"
                  variant="floating"
                  label="Full Name"
                  fill-text="Ada Lovelace"
                />
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Default shell. Placeholder becomes label.
                </DsTypography>
              </div>

              <div class="input-study-card">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Underline
                </DsTypography>
                <label class="input-study-field input-study-field--underline">
                  <span class="input-study-label">Subject</span>
                  <span class="input-study-underline-wrap">
                    <input
                      v-model="inputUnderlineValue"
                      class="input-study-control input-study-control--underline"
                      type="text"
                      placeholder="Tell us what you need"
                    >
                  </span>
                </label>
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Editorial line treatment with a stronger active draw.
                </DsTypography>
              </div>

              <div class="input-study-card">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Border Draw
                </DsTypography>
                <label class="input-study-field input-study-field--draw">
                  <span class="input-study-draw-wrap">
                    <input
                      v-model="inputBorderDrawValue"
                      class="input-study-control input-study-control--draw"
                      type="text"
                      placeholder=" "
                    >
                    <span class="input-study-draw-label">@handle</span>
                    <span class="input-study-draw-outline" />
                  </span>
                </label>
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Rounded reveal border with the same floating-label logic.
                </DsTypography>
              </div>

              <div class="input-study-card">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Pill Search
                </DsTypography>
                <label class="input-study-field">
                  <span class="input-study-label">Search</span>
                  <input
                    v-model="inputPillValue"
                    class="input-study-control input-study-control--pill"
                    type="search"
                    placeholder="Search articles"
                  >
                </label>
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Rounded search-style field for filters, search, or quick query entry.
                </DsTypography>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Typography Scaling Check
          </DsTypography>

          <div class="grid gap-8 md:grid-cols-2">
            <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-5 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Display + Headline
              </DsTypography>

              <div class="space-y-4">
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    display / 4xl • text-$type-display-4xl
                  </DsTypography>
                  <DsTypography as="h1" role="display" size="4xl">
                    Swiss Contrast System
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    display / 3xl • text-$type-display-3xl
                  </DsTypography>
                  <DsTypography as="h2" role="display" size="3xl">
                    Editorial Signals
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    headline / xl • text-$type-headline-xl
                  </DsTypography>
                  <DsTypography as="h3" role="headline" size="xl">
                    Asymmetric Structure
                  </DsTypography>
                </div>
              </div>
            </div>

            <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-5 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
              <DsTypography
                as="p"
                role="meta"
                size="xs"
                uppercase
              >
                Body + Meta + Signal + Quote
              </DsTypography>

              <div class="space-y-4">
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    body / lg • text-$type-body-lg
                  </DsTypography>
                  <DsTypography as="p" role="body" size="lg">
                    The container and spacing tokens keep page rhythm stable across viewport changes.
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    meta / xs • text-$type-meta-xs
                  </DsTypography>
                  <DsTypography as="p" role="meta" size="xs" uppercase>
                    token audit / line-height / letter-spacing
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    signal / sm • text-$type-signal-sm
                  </DsTypography>
                  <DsTypography as="p" role="signal" size="sm">
                    Status channel active
                  </DsTypography>
                </div>
                <div class="space-y-2">
                  <DsTypography as="p" role="meta" size="xs" tone="muted">
                    quote / md • text-$type-quote-md
                  </DsTypography>
                  <DsTypography as="blockquote" role="quote" size="md">
                    Form follows hierarchy.
                  </DsTypography>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-[#ef4444]/6 p-4 outline-2 outline-[#ef4444]/80 outline space-y-6 dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <DsTypography
              as="p"
              role="meta"
              size="xs"
              uppercase
            >
              Full Typography Matrix (All Roles × All Sizes)
            </DsTypography>

            <div class="grid gap-5">
              <div
                v-for="item in typoRoleMatrix"
                :key="item.role"
                class="border border-pureBlack/12 rounded-xl p-4 space-y-4 dark:border-pureWhite/18"
              >
                <DsTypography
                  as="p"
                  role="meta"
                  size="xs"
                  uppercase
                >
                  {{ item.label }}
                </DsTypography>

                <div class="space-y-3">
                  <div
                    v-for="size in typoSizes"
                    :key="`${item.role}-${size}`"
                    class="space-y-1.5"
                  >
                    <DsTypography as="p" role="meta" size="xs" tone="muted">
                      {{ item.role }} / {{ size }} • {{ tokenLabel(item.role, size) }}
                    </DsTypography>
                    <DsTypography
                      as="p"
                      :role="item.role"
                      :size="size"
                      :uppercase="item.uppercase"
                    >
                      {{ item.sample }}
                    </DsTypography>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Frame + Content: max=7xl · gutter=md
          </DsTypography>

          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="p-4 space-y-3">
              <DsButton
                type="primary"
                variant="default"
                size="sm"
              >
                Small
              </DsButton>
              <DsButton
                type="primary"
                variant="default"
                size="md"
              >
                Medium
              </DsButton>
              <DsButton
                type="primary"
                variant="default"
                size="lg"
              >
                Large
              </DsButton>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="true"
    >
      <DsSectionBody
        mode="fluid"
        :debug="true"
      >
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Content: contained=false
          </DsTypography>
          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="flex flex-wrap gap-3 p-4">
              <DsButton
                type="primary"
                variant="default"
                size="md"
              >
                CLICK MEEEEE
              </DsButton>
              <DsButton
                type="secondary"
                variant="default"
                size="md"
              >
                Secondary
              </DsButton>
              <DsButton
                type="tertiary"
                variant="default"
                size="md"
              >
                Tertiary
              </DsButton>
              <DsButton
                type="quaternary"
                variant="default"
                size="md"
              >
                Quaternary
              </DsButton>
            </div>
          </div>

          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="grid gap-5 p-4 lg:grid-cols-2">
              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Switch Context Pack
                </DsTypography>
                <DsSwitch
                  id="debug-switch-context-airplane"
                  v-model="switchAccent"
                  variant="accent"
                  size="md"
                  label="Airplane mode"
                  hint="Spring thumb + pressed width animation."
                />
                <DsSwitch
                  id="debug-switch-context-analytics"
                  v-model="switchDefault"
                  variant="default"
                  size="md"
                  label="Analytics tracking"
                  hint="Default context in contained=false section."
                />
              </div>

              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" uppercase>
                  Dense Utility Pack
                </DsTypography>
                <DsSwitch
                  id="debug-switch-context-compact-1"
                  v-model="switchSizeSm"
                  variant="mixed"
                  size="sm"
                  label="Compact updates"
                />
                <DsSwitch
                  id="debug-switch-context-compact-2"
                  v-model="switchSizeLg"
                  variant="default"
                  size="lg"
                  label="Large display alerts"
                />
              </div>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>

    <DsSectionShell
      spacing="sm"
      :debug="true"
    >
      <DsSectionBody
        max="full"
        gutter="lg"
        :debug="true"
      >
        <div class="bg-[#10b981]/8 outline-1 outline-[#10b981]/80 outline space-y-6 dark:bg-[#10b981]/12 dark:outline-[#34d399]/80 md:space-y-7">
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Content: max=full · gutter=lg
          </DsTypography>
          <div class="mt-3 bg-[#ef4444]/6 outline-2 outline-[#ef4444]/80 outline dark:bg-[#ef4444]/10 dark:outline-[#f87171]/90">
            <div class="flex flex-wrap gap-3 p-4">
              <DsButton
                type="primary"
                variant="accent"
                size="md"
              >
                Primary
              </DsButton>
              <DsButton
                type="secondary"
                variant="accent"
                size="md"
              >
                Secondary
              </DsButton>
              <DsButton
                type="tertiary"
                variant="accent"
                size="md"
              >
                Tertiary
              </DsButton>
              <DsButton
                type="quaternary"
                variant="accent"
                size="md"
              >
                Quaternary
              </DsButton>
            </div>
          </div>
        </div>
      </DsSectionBody>
    </DsSectionShell>
  </div>
</template>

<style scoped>
.input-form-study {
  padding-top: var(--space-2);
}

.input-study-card {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-3_5);
  border: 1px solid color-mix(in srgb, var(--border-primary) 12%, transparent);
  border-radius: var(--radius-xl);
  background: color-mix(in srgb, var(--bg-soft-primary) 18%, transparent);
}

.input-study-field {
  display: grid;
  gap: var(--space-2);
}

.input-study-label {
  font: inherit;
}

.input-study-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: var(--type-size-2xs);
  line-height: var(--type-leading-2xs);
  letter-spacing: var(--type-track-meta-2xs);
  font-weight: 400;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-primary) 70%, transparent);
}

.input-study-control {
  width: 100%;
  min-height: var(--size-control-md);
  padding-inline: var(--space-3_5);
  padding-block: calc(var(--space-2) - 1px);
  border: 1px solid var(--un-preset-radix-sand11);
  border-radius: var(--radius-lg);
  background: transparent;
  color: var(--color-primary);
  font-family: 'Manrope', sans-serif;
  font-size: var(--type-size-md);
  line-height: var(--type-leading-md);
  font-weight: 300;
  outline: none;
  transition:
    border-color 160ms ease,
    background-color 160ms ease,
    box-shadow 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.input-study-control::placeholder {
  color: color-mix(in srgb, var(--color-primary) 46%, transparent);
  font-size: var(--type-size-sm);
  line-height: var(--type-leading-sm);
  opacity: 1;
}

.input-study-control:hover {
  border-color: var(--border-accent-hover);
  box-shadow: 0 0 0 1px var(--border-accent-hover);
}

.input-study-control:focus-visible {
  border-color: var(--border-accent);
  box-shadow: 0 0 0 var(--focus-ring-inner-width) var(--border-accent);
}

.input-study-control--error {
  border-color: #df3478;
  background: color-mix(in srgb, #df3478 4%, transparent);
}

.dark .input-study-control--error {
  border-color: #ee518a;
  background: color-mix(in srgb, #ee518a 6%, transparent);
}

.input-study-field--underline {
  gap: var(--space-1);
}

.input-study-underline-wrap {
  position: relative;
  display: block;
}

.input-study-underline-wrap::after,
.input-study-underline-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  pointer-events: none;
}

.input-study-underline-wrap::after {
  background: color-mix(in srgb, var(--border-primary) 20%, transparent);
}

.input-study-underline-wrap::before {
  background: var(--color-accent-hover);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.input-study-control--underline {
  border: none;
  border-radius: 0;
  padding-inline: 0;
  padding-block: calc(var(--space-2) - 1px);
  box-shadow: none;
}

.input-study-control--underline:hover,
.input-study-control--underline:focus-visible {
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.input-study-underline-wrap:focus-within::before {
  transform: scaleX(1);
}

.input-study-field--draw {
  gap: var(--space-1);
}

.input-study-draw-wrap {
  position: relative;
  display: block;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    border-color 160ms ease,
    background-color 160ms ease;
}

.input-study-draw-wrap:hover {
  border-color: color-mix(in srgb, var(--color-accent-hover) 28%, var(--border-primary));
  background: color-mix(in srgb, var(--bg-soft-primary) 12%, transparent);
}

.input-study-draw-label {
  position: absolute;
  left: var(--space-3_5);
  top: calc(var(--size-control-md) / 2);
  transform: translateY(-50%);
  transform-origin: left center;
  pointer-events: none;
  font-family: 'Manrope', sans-serif;
  font-size: var(--type-size-md);
  line-height: var(--type-leading-md);
  font-weight: 300;
  color: color-mix(in srgb, var(--color-primary) 46%, transparent);
  transition:
    transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
    top 220ms cubic-bezier(0.22, 1, 0.36, 1),
    color 160ms ease,
    font-size 160ms ease;
}

.input-study-control--draw {
  background: transparent;
  border-color: color-mix(in srgb, var(--border-primary) 14%, transparent);
  border-radius: 0;
}

.input-study-control--draw:hover,
.input-study-control--draw:focus-visible {
  border-color: transparent;
  box-shadow: none;
}

.input-study-draw-outline {
  position: absolute;
  inset: 0;
  border: 1px solid var(--color-accent-hover);
  border-radius: inherit;
  opacity: 0;
  transform: scale(0.975);
  pointer-events: none;
  transition:
    opacity 220ms ease,
    transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
}

.input-study-draw-wrap:focus-within {
  border-color: color-mix(in srgb, var(--color-accent-hover) 18%, transparent);
  background: color-mix(in srgb, var(--bg-soft-primary) 18%, transparent);
}

.input-study-draw-wrap:hover .input-study-draw-outline,
.input-study-draw-wrap:focus-within .input-study-draw-outline {
  opacity: 1;
  transform: scale(1);
}

.input-study-control--draw:focus-visible + .input-study-draw-label,
.input-study-control--draw:not(:placeholder-shown) + .input-study-draw-label {
  top: calc(var(--space-2) - 1px);
  transform: translateY(0) scale(0.82);
  font-size: var(--type-size-2xs);
  color: var(--color-accent-ui);
  font-weight: 300;
}

.dark .input-study-control--draw:focus-visible + .input-study-draw-label,
.dark .input-study-control--draw:not(:placeholder-shown) + .input-study-draw-label {
  color: var(--color-accent-ui);
}

.input-study-control--pill {
  border-radius: 9999px;
  padding-inline: calc(var(--space-4) + var(--space-0_25));
}
</style>
