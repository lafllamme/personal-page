<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

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

const toggleItem = (id: string) => {
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
    } else {
      isSectionVisible.value = false
      animatedLetters.value = {}
      animatedDesc.value = false
      animatedItems.value = {}
    }
  },
  { threshold: 0.1, rootMargin: '0px' },
)

/* Animation timing - Title und Items starten zeitgleich, schneller gestaggert */
const letterDelay = (i: number) => i * 40 // ms - schneller für smoother feel
const itemStartDelay = 50 // ms - Items starten kurz nach Title beginnt (zeitgleich)
const itemStagger = 50 // ms - schnellerer Stagger zwischen Items
const descDelay = itemStartDelay + (3 * itemStagger) + 100 // ms - Description kommt nach ersten 3 Items

/* Track which elements should be animated (staggered) */
const animatedLetters = ref<Record<number, boolean>>({})
const animatedDesc = ref(false)
const animatedItems = ref<Record<number, boolean>>({})

/* Stagger animations when section becomes visible */
watch(isSectionVisible, (visible) => {
  if (!visible) {
    animatedLetters.value = {}
    animatedDesc.value = false
    animatedItems.value = {}
    return
  }
  
  nextTick(() => {
    const titleLength = props.title?.length ?? 0
    
    // Title startet sofort
    for (let i = 0; i < titleLength; i++) {
      setTimeout(() => {
        animatedLetters.value[i] = true
      }, letterDelay(i))
    }
    
    // Items starten zeitgleich mit Title (nach kurzer Verzögerung)
    props.items.forEach((_, i) => {
      setTimeout(() => {
        animatedItems.value[i] = true
      }, itemStartDelay + (i * itemStagger))
    })
    
    // Description kommt später (nach den ersten Items)
    setTimeout(() => {
      animatedDesc.value = true
    }, descDelay)
  })
}, { immediate: true })

// Panel refs for height calculations
const panelRefs = ref<Record<string, HTMLElement | null>>({})
const contentRefs = ref<Record<string, HTMLElement | null>>({})

const updatePanelHeight = (itemId: string) => {
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

const resizeHandler = () => {
  if (expandedId.value)
    updatePanelHeight(expandedId.value)
}

onMounted(() => {
  nextTick(() => {
    const expandedItem = props.items.find(item => item.id === expandedId.value && item.content)
    if (expandedItem)
      updatePanelHeight(expandedItem.id)
  })
  if (typeof window !== 'undefined')
    window.addEventListener('resize', resizeHandler)
})

onUnmounted(() => {
  if (typeof window !== 'undefined')
    window.removeEventListener('resize', resizeHandler)
})

const handleImageLoad = (itemId: string) => {
  nextTick(() => {
    updatePanelHeight(itemId)
  })
}
</script>

<template>
  <section
    ref="sectionRef"
    class="flex justify-center items-center min-h-screen rounded-md"
    :class="{ 'is-visible': isSectionVisible }"
  >
    <div class="w-full">
      <div class="sm:p-10 p-6 mx-auto bg-pureWhite dark:bg-pureBlack color-pureBlack dark:color-pureWhite min-h-screen w-full shadow-xs">
        <!-- Header Section -->
        <article class="max-w-7xl mx-auto sm:flex justify-between items-end py-10 gap-4">
          <h1 class="md:text-8xl text-6xl font-medium color-pureBlack/80 dark:color-pureWhite/80 uppercase font-['Poppins','Poppins_Fallback',sans-serif]">
            <span class="flex flex-wrap whitespace-pre-wrap">
              <span class="sr-only">{{ title }}</span>
              <span aria-hidden="true" class="inline-flex overflow-hidden">
                <span
                  v-for="(char, index) in title.split('')"
                  :key="index"
                  class="whitespace-pre-wrap relative"
                >
                  <span
                    class="inline-block transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]"
                    :class="{
                      'opacity-0 translate-y-full': !animatedLetters[index],
                      'opacity-100 translate-y-0': animatedLetters[index],
                    }"
                  >{{ char }}</span>
                </span>
              </span>
            </span>
          </h1>
          <div
            class="sm:w-96 space-y-1.5 sm:pt-0 pt-4 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter,transform]"
            :class="{
              'opacity-0 blur-[20px] translate-y-[40px]': !animatedDesc,
              'opacity-100 blur-0 translate-y-0': animatedDesc,
            }"
          >
            <p class="text-justify sm:text-sm text-xs font-['Poppins','Poppins_Fallback',sans-serif]">
              {{ description }}
            </p>
          </div>
        </article>

        <!-- Accordion Section -->
        <div class="mt-3 max-w-7xl mx-auto">
          <div
            v-for="(item, itemIndex) in items"
            :key="item.id"
            :class="[
              'group mb-0 rounded-none overflow-visible bg-transparent w-full py-2',
              isExpanded(item.id) && 'data-active',
            ]"
            :data-active="isExpanded(item.id) ? 'true' : undefined"
          >
            <!-- Button wrapper - animates with blur + slide -->
            <div
              class="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter,transform]"
              :class="{
                'opacity-0 blur-[20px] translate-y-[40px]': !animatedItems[itemIndex],
                'opacity-100 blur-0 translate-y-0': animatedItems[itemIndex],
              }"
            >
              <button
                type="button"
                :aria-expanded="isExpanded(item.id)"
                :data-active="isExpanded(item.id) ? 'true' : undefined"
                :id="`accordion-header-item-${item.id}`"
                class="cursor-pointer w-full transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] font-semibold hover:color-pureBlack dark:hover:color-pureWhite text-left hover:no-underline gap-5 border-t-2 border-pureBlack dark:border-pureWhite p-0 flex justify-between items-center py-2 relative data-active:bg-transparent hover:bg-transparent color-pureBlack dark:color-pureWhite sm:text-base text-sm font-['Poppins','Poppins_Fallback',sans-serif]"
                @click="toggleItem(item.id)"
              >
                <h1 class="md:text-6xl sm:text-4xl text-xl font-medium uppercase font-['Poppins','Poppins_Fallback',sans-serif]">
                  {{ item.heading }}
                </h1>
                <p class="md:text-2xl sm:text-xl text-sm space-x-2 gap-10 w-60 font-medium font-['Poppins','Poppins_Fallback',sans-serif]">
                  {{ item.description }}
                </p>
              </button>
            </div>

            <!-- Expanded Panel wrapper - also animates with blur + slide -->
            <div
              class="transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter,transform]"
              :class="{
                'opacity-0 blur-[20px] translate-y-[40px]': !animatedItems[itemIndex],
                'opacity-100 blur-0 translate-y-0': animatedItems[itemIndex],
              }"
            >
              <div
                :ref="el => panelRefs[item.id] = el as HTMLElement"
                :data-active="isExpanded(item.id) ? 'true' : undefined"
                role="region"
                :id="`accordion-panel-item-${item.id}`"
                :aria-labelledby="`accordion-header-item-${item.id}`"
                class="color-pureBlack dark:color-pureWhite space-y-4 w-full mx-auto bg-pureWhite dark:bg-pureBlack data-active:bg-pureWhite dark:data-active:bg-pureBlack px-0 rounded-lg overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] font-['Poppins','Poppins_Fallback',sans-serif]"
                :style="{
                  height: isExpanded(item.id) ? (contentRefs[item.id] ? `${contentRefs[item.id].scrollHeight}px` : 'auto') : '0px',
                }"
              >
                <div
                  :ref="el => contentRefs[item.id] = el as HTMLElement"
                  class="space-y-2 bg-pureWhite dark:bg-pureBlack sm:p-10 p-4 rounded-lg"
                  style="clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0% 100%);"
                >
                  <div class="gap-4 justify-between grid sm:grid-cols-2">
                    <!-- Left Column: Text Content -->
                    <div class="sm:w-[80%] w-full space-y-10">
                      <span class="flex flex-col space-y-2">
                        <span
                          v-if="item.year"
                          class="text-sm sm:text-base italic font-normal font-['Poppins','Poppins_Fallback',sans-serif]"
                        >
                          {{ item.year }}
                        </span>
                        <span
                          v-if="item.role"
                          class="sm:text-xl uppercase font-medium font-['Poppins','Poppins_Fallback',sans-serif]"
                        >
                          {{ item.role }}
                        </span>
                      </span>
                      <p
                        v-if="item.content"
                        class="text-sm sm:text-base font-['Poppins','Poppins_Fallback',sans-serif]"
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
                          class="px-2 py-1 rounded-md bg-pureBlack dark:bg-pureWhite color-pureWhite dark:color-pureBlack border border-pureBlack dark:border-pureWhite font-['Poppins','Poppins_Fallback',sans-serif]"
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
                      <img
                        :src="item.imageUrl"
                        :alt="item.heading"
                        class="w-full sm:h-96 h-64 object-cover rounded-md"
                        loading="lazy"
                        @load="handleImageLoad(item.id)"
                      >
                      <span class="absolute bottom-4 left-4 sm:w-20 sm:h-20 w-12 h-12 bg-pureWhite dark:bg-pureBlack z-10 rounded-lg flex items-center justify-center border border-pureBlack/10 dark:border-pureWhite/10">
                        <Icon
                          name="lucide:arrow-up-right"
                          class="color-pureBlack dark:color-pureWhite sm:h-12 sm:w-12 h-8 w-8"
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
  </section>
</template>
