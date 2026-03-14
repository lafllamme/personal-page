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
                  <DsBadge text="LG badge" size="lg" />
                  <DsBadge text="XL badge" size="xl" />
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
                Animated (Experimental)
              </DsTypography>
              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Variant parity
                </DsTypography>
                <div class="flex flex-wrap gap-2">
                  <DsBadge text="Default Shimmer" variant="default" type="soft" animation="shimmer" />
                  <DsBadge text="Accent Shimmer" variant="accent" type="soft" animation="shimmer" icon="iconoir:spark" />
                  <DsBadge text="Mixed Shimmer" variant="mixed" type="soft" animation="shimmer" dot />
                </div>
              </div>
              <div class="space-y-3">
                <DsTypography as="p" role="meta" size="2xs" tone="muted">
                  Type parity (beam overlay ring)
                </DsTypography>
                <div class="flex flex-wrap gap-2">
                  <DsBadge text="Beam Solid" variant="accent" type="solid" animation="beam" />
                  <DsBadge text="Beam Outline" variant="accent" type="outline" animation="beam" />
                  <DsBadge text="Beam Soft" variant="accent" type="soft" animation="beam" />
                  <DsBadge text="Beam Crisp" variant="accent" type="crisp" animation="beam" />
                </div>
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
</style>
