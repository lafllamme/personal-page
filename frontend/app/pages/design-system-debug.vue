<script setup lang="ts">
import { computed, ref } from 'vue'
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

const contactName = ref('')
const contactEmail = ref('')
const contactCompany = ref('')
const contactSubject = ref('')
const formSubject = ref('')
const formFirstName = ref('')
const formLastName = ref('')
const formEmail = ref('')
const formPhone = ref('')
const formReadonlyHandle = ref('published')
const formReadonlyEmail = ref('editorial@tecnews.com')
const formFirstNameTouched = ref(false)
const formEmailTouched = ref(false)
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

function isValidEmail(value: string): boolean {
  const trimmed = value.trim()
  const atIndex = trimmed.indexOf('@')
  if (atIndex <= 0 || atIndex !== trimmed.lastIndexOf('@'))
    return false

  const local = trimmed.slice(0, atIndex)
  const domain = trimmed.slice(atIndex + 1)
  if (!local || !domain)
    return false

  if (domain.startsWith('.') || domain.endsWith('.') || !domain.includes('.'))
    return false

  if (trimmed.includes(' '))
    return false

  return true
}

const formEmailError = computed(() => {
  if (!formEmailTouched.value)
    return ''

  const value = formEmail.value.trim()
  if (!value)
    return 'Bitte gib eine E-Mail Adresse ein.'

  if (!isValidEmail(value))
    return 'E-Mail Adresse ist ungueltig.'

  return ''
})

const formFirstNameError = computed(() => {
  if (!formFirstNameTouched.value)
    return ''

  if (!formFirstName.value.trim())
    return 'Vorname ist erforderlich.'

  return ''
})

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
          <DsTypography
            as="p"
            role="meta"
            size="xs"
            uppercase
          >
            Input Forge
          </DsTypography>

          <div class="grid gap-5 lg:grid-cols-2">
            <div class="space-y-5">
              <DsInput
                id="debug-contact-name"
                v-model="contactName"
                label="Full Name"
                placeholder="Ada Lovelace"
                hint="Use the same body voice you would expect in a real form."
              />

              <DsInput
                id="debug-contact-email"
                v-model="contactEmail"
                type="email"
                label="Work Email"
                placeholder="ada@analytical.engine"
                hint="Focus-visible preview uses the accent ring."
              />
            </div>

            <div class="space-y-5">
              <DsInput
                id="debug-contact-company"
                v-model="contactCompany"
                label="Company"
                placeholder="Analytical Engines Ltd."
                hint="Hover preview should stay subtle and neutral."
              />

              <DsInput
                id="debug-contact-subject"
                v-model="contactSubject"
                label="Subject"
                placeholder="Tell us what you need"
                required
              />
            </div>
          </div>

          <div class="input-form-study space-y-4">
            <DsTypography
              as="p"
              role="body"
              size="sm"
              tone="muted"
            >
              Bitte fuelle alle mit * gekennzeichneten Felder aus.
            </DsTypography>

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
                :error="formFirstNameError"
                required
                @blur="formFirstNameTouched = true"
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
                :error="formEmailError"
                required
                @blur="formEmailTouched = true"
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
