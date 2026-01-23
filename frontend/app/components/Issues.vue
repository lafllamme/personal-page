<script setup lang="ts">
import { useEventListener, useIntersectionObserver } from '@vueuse/core'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

interface AccordionItem {
  id: string
  heading: string
  description: string
  year?: string
  role?: string
  content?: string
  tags?: string[]
  imageUrl?: string
}

const props = withDefaults(defineProps<{
  title?: string
  description?: string
  items?: AccordionItem[]
}>(), {
  title: 'ISSUES',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat aperiam dolorem voluptates mollitia necessitatibus voluptatibus porro alias repellendus quasi maiores!',
  items: () => [
    {
      id: '1',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2020-2021)',
      role: 'a. Design director',
      content: 'We specialize in custom AI solutions including chatbots, predictive analytics, computer vision, NLP, and automation workflows tailored to your business needs.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1751554933476-d029737d58b2?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '2',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2019-2020)',
      role: 'Seniour designer',
      content: 'We offer flexible pricing based on project complexity and duration—ranging from fixed project fees to retainer and hourly models.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1752350434868-af7431a9f14b?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '3',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2018-2019)',
      role: 'PRODUCT DESIGNER',
      content: 'Absolutely! We offer seamless integration with CRMs, ERPs, databases, APIs, and other third-party tools your business relies on.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1751704549146-6cae1f348143?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '4',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2017-2018)',
      role: 'UX Designer',
      content: 'Our team follows agile methodologies with regular sprints, stand-ups, and client check-ins to ensure transparency and timely delivery.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1751554933476-d029737d58b2?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '5',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2016-2017)',
      role: 'Creative Director',
      content: 'Yes, we provide comprehensive support including bug fixes, feature updates, and maintenance plans to keep your solution running smoothly.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1752350434868-af7431a9f14b?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '6',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2015-2016)',
      role: 'Lead Designer',
      content: 'We use industry-standard tools and technologies including React, Node.js, Python, TensorFlow, and cloud platforms like AWS and Azure.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1751704549146-6cae1f348143?q=80&w=880&auto=format&fit=crop',
    },
    {
      id: '7',
      heading: 'ISSUE/N17',
      description: 'Silly myths about wooden houses',
      year: '(2014-2015)',
      role: 'Senior Designer',
      content: 'Our typical project timeline ranges from 4-12 weeks depending on scope, with MVP delivery possible in as little as 2-3 weeks for smaller projects.',
      tags: ['AI', 'Design', 'Development'],
      imageUrl: 'https://images.unsplash.com/photo-1751554933476-d029737d58b2?q=80&w=880&auto=format&fit=crop',
    },
  ],
})

const expandedId = ref<string | null>(props.items[2]?.id || null)
function toggleItem(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}
const isExpanded = (id: string) => expandedId.value === id

/* -------------------------------------------------------------------------- */
/*  Intersection: animate when whole section is visible (VueUse)               */
/*  Matches reference: JS-controlled classes, UnoCSS transitions              */
/* -------------------------------------------------------------------------- */

const sectionRef = ref<HTMLElement | null>(null)
const isSectionVisible = ref(false)

useIntersectionObserver(
  sectionRef,
  ([entry]) => {
    if (entry?.isIntersecting) {
      if (!isSectionVisible.value) {
        isSectionVisible.value = true
      }
    }
    else {
      isSectionVisible.value = false
      animatedLetters.value = {}
      animatedDescWords.value = {}
      animatedItems.value = {}
    }
  },
  { threshold: 0.1, rootMargin: '0px' },
)

/* Animation timing - Everything starts simultaneously with staggered delays */
const letterDelay = (i: number) => i * 50 // ms - Character stagger (30ms per char)
const descWordDelay = (i: number) => i * 60 // ms - Word stagger (30ms per word)
const itemDelay = (i: number) => i * 150 // ms - Item stagger (60ms per item, starts immediately)

const descWords = computed(() => (props.description || '').split(/\s+/))

/* Track which elements should be animated (staggered) */
const animatedLetters = ref<Record<number, boolean>>({})
const animatedDescWords = ref<Record<number, boolean>>({})
const animatedItems = ref<Record<number, boolean>>({})

/* Stagger animations when section becomes visible */
watch(isSectionVisible, (visible) => {
  if (!visible) {
    animatedLetters.value = {}
    animatedDescWords.value = {}
    animatedItems.value = {}
    return
  }

  nextTick(() => {
    const titleLength = props.title?.length ?? 0
    const totalDescWords = descWords.value.length

    // ALL animations start simultaneously with staggered delays
    // Heading characters
    for (let i = 0; i < titleLength; i++) {
      setTimeout(() => {
        animatedLetters.value[i] = true
      }, letterDelay(i))
    }

    // Description words (start immediately, same time as heading)
    for (let i = 0; i < totalDescWords; i++) {
      setTimeout(() => {
        animatedDescWords.value[i] = true
      }, descWordDelay(i))
    }

    // Items (start immediately, same time as heading)
    props.items.forEach((_, i) => {
      setTimeout(() => {
        animatedItems.value[i] = true
      }, itemDelay(i))
    })
  })
}, { immediate: true })

// Panel refs for height calculations
const panelRefs = ref<Record<string, HTMLElement | null>>({})
const contentRefs = ref<Record<string, HTMLElement | null>>({})

function updatePanelHeight(itemId: string) {
  if (contentRefs.value[itemId] && panelRefs.value[itemId] && isExpanded(itemId)) {
    const content = contentRefs.value[itemId]
    const panel = panelRefs.value[itemId]
    if (content && panel) {
      panel.style.height = `${content.scrollHeight}px`
    }
  }
}

watch(expandedId, (newId, oldId) => {
  nextTick(() => {
    if (oldId && panelRefs.value[oldId]) {
      const panel = panelRefs.value[oldId]
      if (panel) {
        panel.style.height = '0px'
      }
    }
    if (newId) {
      updatePanelHeight(newId)
    }
  })
})

function resizeHandler() {
  if (expandedId.value)
    updatePanelHeight(expandedId.value)
}

useEventListener(() => window, 'resize', resizeHandler)

onMounted(() => {
  nextTick(() => {
    const expandedItem = props.items.find(item => item.id === expandedId.value && item.content)
    if (expandedItem)
      updatePanelHeight(expandedItem.id)
  })
})

function handleImageLoad(itemId: string) {
  nextTick(() => {
    updatePanelHeight(itemId)
  })
}

</script>

<template>
  <section
    ref="sectionRef"
    class="min-h-screen flex items-center justify-center rounded-md"
    :class="{ 'is-visible': isSectionVisible }"
  >
    <div class="w-full">
      <div class="mx-auto min-h-screen w-full color-pureBlack dark:color-pureWhite">
        <!-- Header Section -->
        <article class="items-end justify-between gap-4 py-10 sm:flex">
          <h1 class="font-manrope text-6xl color-teal-11 font-semibold uppercase md:text-8xl dark:color-teal-10">
            <span class="flex flex-wrap whitespace-pre-wrap">
              <span class="sr-only">{{ title }}</span>
              <span
                v-for="(char, index) in title.split('')"
                :key="index"
                aria-hidden="true"
                class="inline-flex overflow-hidden"
              >
                <span class="relative whitespace-pre-wrap">
                  <span
                    class="inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    :style="!animatedLetters[index] ? 'transform: translateY(100%)' : 'transform: none'"
                  >{{ char }}</span>
                </span>
              </span>
            </span>
          </h1>
          <!-- Description -->
          <div class="w-full pt-4 sm:w-96 space-y-1.5 sm:pt-0">
            <span class="font-clash-regular flex flex-wrap whitespace-pre-wrap text-justify text-xs leading-relaxed tracking-wide sm:text-sm">
              <span class="sr-only">{{ descWords.join(' ') }}</span>
              <span
                v-for="(word, idx) in descWords"
                :key="`desc-${idx}`"
                aria-hidden="true"
                class="inline-flex overflow-hidden"
              >
                <span class="relative whitespace-pre-wrap">
                  <span
                    class="inline-block transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    :style="!animatedDescWords[idx] ? 'transform: translateY(-100%)' : 'transform: none'"
                  >{{ word }}{{ idx < descWords.length - 1 ? ' ' : '' }}</span>
                </span>
              </span>
            </span>
          </div>
        </article>

        <!-- Accordion Section -->
        <div class="mt-3">
          <div
            v-for="(item, itemIndex) in items"
            :key="item.id"
            class="mb-0 w-full overflow-visible rounded-none py-2"
            :class="[
              isExpanded(item.id) && 'data-active',
            ]"
            :data-active="isExpanded(item.id) ? 'true' : undefined"
          >
            <!-- Button wrapper - animates with blur + slide -->
            <div
              class="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-jade-5 dark:hover:bg-teal-3"
              :style="!animatedItems[itemIndex] ? 'filter: blur(20px); opacity: 0; transform: translateY(40px)' : 'filter: blur(0px); opacity: 1; transform: none'"
            >
              <button
                :id="`accordion-header-item-${item.id}`"
                type="button"
                :aria-expanded="isExpanded(item.id)"
                :data-active="isExpanded(item.id) ? 'true' : undefined"
                class="data-active:bg-transparent relative w-full flex cursor-pointer items-center justify-between gap-5 border-t-2 border-pureBlack p-0 py-2 text-left text-sm color-pureBlack transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] dark:border-pureWhite hover:bg-transparent sm:text-base dark:color-pureWhite hover:color-pureBlack hover:no-underline dark:hover:color-pureWhite"
                @click="toggleItem(item.id)"
              >
                <h1 class="font-manrope text-xl font-medium uppercase md:text-6xl sm:text-4xl">
                  {{ item.heading }}
                </h1>
                <p class="geist-regular w-60 gap-10 text-sm font-normal tracking-normal space-x-2 md:text-2xl sm:text-xl">
                  {{ item.description }}
                </p>
              </button>
            </div>

            <!-- Expanded Panel wrapper - also animates with blur + slide -->
            <div
              class="transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              :style="!animatedItems[itemIndex] ? 'filter: blur(20px); opacity: 0; transform: translateY(40px)' : 'filter: blur(0px); opacity: 1; transform: none'"
            >
              <div
                :id="`accordion-panel-item-${item.id}`"
                :ref="el => panelRefs[item.id] = el as HTMLElement"
                :data-active="isExpanded(item.id) ? 'true' : undefined"
                role="region"
                :aria-labelledby="`accordion-header-item-${item.id}`"
                class="data-active:bg-pureWhite dark:data-active:bg-pureBlack mx-auto w-full overflow-hidden rounded-lg bg-pureWhite px-0 color-pureBlack font-['Poppins','Poppins_Fallback',sans-serif] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] space-y-4 dark:bg-pureBlack dark:color-pureWhite"
                :style="{
                  height: isExpanded(item.id) ? (contentRefs[item.id] ? `${contentRefs[item.id].scrollHeight}px` : 'auto') : '0px',
                }"
              >
                <div
                  :ref="el => contentRefs[item.id] = el as HTMLElement"
                  class="rounded-lg bg-pureWhite p-4 space-y-2 dark:bg-pureBlack sm:p-10"
                  style="clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%);"
                >
                  <div class="grid justify-between gap-4 sm:grid-cols-2">
                    <!-- Left Column: Text Content -->
                    <div class="w-full sm:w-[80%] space-y-10">
                      <span class="flex flex-col space-y-2">
                        <span
                          v-if="item.year"
                          class="text-sm font-normal font-['Poppins','Poppins_Fallback',sans-serif] italic sm:text-base"
                        >
                          {{ item.year }}
                        </span>
                        <span
                          v-if="item.role"
                          class="font-medium font-['Poppins','Poppins_Fallback',sans-serif] uppercase sm:text-xl"
                        >
                          {{ item.role }}
                        </span>
                      </span>
                      <p
                        v-if="item.content"
                        class="text-sm font-['Poppins','Poppins_Fallback',sans-serif] sm:text-base"
                      >
                        {{ item.content }}
                      </p>
                      <div
                        v-if="item.tags && item.tags.length > 0"
                        class="flex gap-2 text-sm"
                      >
                        <span
                          v-for="tag in item.tags"
                          :key="tag"
                          class="border border-pureBlack rounded-md bg-pureBlack px-2 py-1 color-pureWhite font-['Poppins','Poppins_Fallback',sans-serif] dark:border-pureWhite dark:bg-pureWhite dark:color-pureBlack"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>

                    <!-- Right Column: Image -->
                    <div
                      v-if="item.imageUrl"
                      class="relative"
                    >
                      <div
                        class="group inline-block w-full [perspective:1000px]"
                      >
                        <div class="relative h-64 w-full overflow-hidden rounded-md [transform-style:preserve-3d] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_12px_30px_rgba(0,0,0,0.16)] will-change-transform group-hover:[transform:rotateX(5deg)_rotateY(-8deg)_scale(1.05)] group-hover:shadow-[-20px_30px_60px_rgba(0,0,0,0.25)] motion-reduce:transition-none sm:h-96">
                          <img
                            :src="item.imageUrl"
                            :alt="item.heading"
                            class="h-full w-full object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform group-hover:[transform:scale(1.12)_translateZ(20px)] motion-reduce:transition-none"
                            loading="lazy"
                            @load="handleImageLoad(item.id)"
                          >
                          <span class="absolute bottom-4 left-4 z-10 h-12 w-12 flex items-center justify-center border border-pureBlack/10 rounded-lg bg-pureWhite/95 shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform group-hover:[transform:translateZ(60px)_scale(1.2)_rotate(360deg)] group-hover:bg-pureBlack/90 group-hover:color-pureWhite motion-reduce:transition-none dark:border-pureWhite/10 dark:bg-pureWhite dark:color-pureBlack sm:h-20 sm:w-20">
                            <Icon
                              name="lucide:arrow-up-right"
                              class="h-8 w-8 sm:h-12 sm:w-12"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
