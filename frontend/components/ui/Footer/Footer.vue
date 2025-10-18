<script setup>
import { ref, watch } from 'vue'
import NewsletterInput from '@/components/ui/Input/NewsletterInput/NewsletterInput.vue'
import Link from '@/components/ui/Link/Link.vue'
import Divider from '@/components/ui/Menu/Divider/Divider.vue'
import { useVisibilityObserver } from '@/composables/useVisibilityObserver.js'

// Data
const currentYear = new Date().getFullYear().toString()

const categories = [
  'Artificial Intelligence',
  'Blockchain',
  'Cybersecurity',
  'Cloud Computing',
]
const resources = [
  'Latest News',
  'Trending',
  'Analysis',
  'Interviews',
]
const company = [
  'About Us',
  'Careers',
  'Contact',
  'Site Map',
]
const socialLinks = [
  { name: 'Twitter', iconName: 'ri:twitter-x-fill', href: '#' },
  { name: 'LinkedIn', iconName: 'ri:linkedin-box-fill', href: '#' },
  { name: 'GitHub', iconName: 'ri:github-fill', href: '#' },
  { name: 'Email', iconName: 'ri:mail-send-fill', href: '#' },
]
const legalLinks = [
  'Privacy Policy',
  'Terms of Service',
  'Cookie Policy',
]

// SMOOTH STAGGER LOGIC
const footerRef = ref(null)
const bottomRef = ref(null)
const footerVisible = ref(false)
const bottomVisible = ref(false)
useVisibilityObserver(footerRef, footerVisible)
useVisibilityObserver(bottomRef, bottomVisible)

// One boolean per section to animate
const N = 6 // how many "parts": divider, brand, cat, res, comp, connect+copyright
const partsVisible = ref(Array.from({ length: N }).fill(false))

// When footer becomes visible, stagger sections one by one (each ~100ms)
watch(footerVisible, (vis) => {
  if (!vis)
    return
  for (let i = 0; i < N; i++) {
    setTimeout(() => {
      partsVisible.value[i] = true
    }, (i + 1) * 125)
  }
}, { immediate: true })
</script>

<template>
  <div ref="footerRef">
    <!-- Divider (Part 0) -->
    <div class="px-4 md:px-12">
      <Divider
        :class="partsVisible[0] ? 'animate-divider' : 'opacity-0'"
      />
    </div>

    <footer class="text-white from-gray-900 via-gray-900 to-black bg-gradient-to-br">
      <div class="px-4 py-8 md:px-12">
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 mb-8 gap-12 lg:grid-cols-12">
          <!-- Brand Section (Part 1) -->
          <div
            :class="[
              partsVisible[1] ? 'animate-fade-in-up' : 'opacity-0 translate-y-16',
            ]" class="color-gray-12 lg:col-span-4 space-y-6"
          >
            <div class="space-grotesk-regular flex items-center gap-2 color-teal-10">
              <Icon class="h-6 w-6" name="ri:newspaper-line" />
              <h3 class="text-md font-medium tracking-wide">
                Stay Informed
              </h3>
            </div>
            <div class="flex flex-col space-y-1">
              <h4 class="geist-regular text-4xl font-bold leading-tight tracking-tight">
                <!-- Mobile: single line -->
                <span class="block md:hidden">
                  The future of tech, <span class="color-teal-10">delivered weekly</span>
                </span>
                <!-- Desktop: two lines -->
                <span class="hidden md:inline">
                  <span>The future of tech,</span>
                  <br>
                  <span class="color-teal-10">delivered weekly</span>
                </span>
              </h4>

              <p class="color-gray-10 font-light leading-relaxed tracking-tight">
                Get exclusive insights, expert analysis, and breaking tech news delivered to your inbox every Tuesday
                and Friday.
              </p>
            </div>
            <div class="space-y-4">
              <!-- Newsletter -->
              <NewsletterInput />
            </div>
          </div>

          <!-- Navigation Links -->
          <div class="grid grid-cols-2 gap-8 lg:col-span-8 md:grid-cols-4">
            <!-- Categories (Part 2) -->
            <div
              :class="[partsVisible[2] ? 'animate-fade-in-up' : 'opacity-0 translate-y-16']" class="space-y-4"
            >
              <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
                Categories
              </h3>
              <nav class="space-y-3">
                <Link
                  v-for="item in categories"
                  :key="item"
                  class="w-fit flex p-1 color-gray-11 font-light transition-colors -m-1 hover:color-mint-12"
                  href="#"
                >
                  {{ item }}
                </Link>
              </nav>
            </div>

            <!-- Resources (Part 3) -->
            <div
              :class="[partsVisible[3] ? 'animate-fade-in-up' : 'opacity-0 translate-y-16']" class="space-y-4"
            >
              <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
                Resources
              </h3>
              <nav class="space-y-3">
                <Link
                  v-for="item in resources"
                  :key="item"
                  class="w-fit flex p-1 color-gray-11 font-light transition-colors -m-1 hover:color-mint-12"
                  href="#"
                >
                  {{ item }}
                </Link>
              </nav>
            </div>

            <!-- Company (Part 4) -->
            <div
              :class="[partsVisible[4] ? 'animate-fade-in-up' : 'opacity-0 translate-y-16']" class="space-y-4"
            >
              <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
                Company
              </h3>
              <nav class="space-y-3">
                <Link
                  v-for="item in company"
                  :key="item"
                  class="w-fit flex p-1 color-gray-11 font-light transition-colors -m-1 hover:color-mint-12"
                  href="/sitemap.xml"
                >
                  {{ item }}
                </Link>
              </nav>
            </div>

            <!-- Connect + Social (Part 5) -->
            <div
              :class="[partsVisible[5] ? 'animate-fade-in-up' : 'opacity-0 translate-y-16']" class="space-y-4"
            >
              <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
                Connect
              </h3>
              <div class="w-full flex items-center space-x-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.name"
                  :href="social.href"
                  class="inline-flex p-1 color-pureBlack transition-all -m-1 hover:scale-120 dark:color-pureWhite hover:color-mint-12 focus-visible:outline-none focus-visible:ring focus-visible:ring-mint-8"
                >
                  <Icon
                    :name="social.iconName"
                    class="size-6"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Separator -->
        <Divider
          :class="bottomVisible ? 'animate-divider' : 'opacity-0'"
        />

        <!-- Bottom Section (Copyright) -->
        <div
          ref="bottomRef"
          :class="[
            bottomVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-16',
          ]" class="flex flex-col items-center justify-between pt-8 md:flex-row space-y-4 md:space-y-0"
        >
          <p class="color-gray-11 font-light transition-colors duration-300 ease-out hover:color-mint-12">
            © {{ currentYear }} TecNews. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <Link
              v-for="item in legalLinks"
              :key="item"
              :underline="false"
              class="p-1 text-sm color-gray-11 font-light transition-colors duration-300 ease-out -m-1 hover:color-mint-12"
              href="#"
            >
              {{ item }}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px) scale(0.97);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 1.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes growWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.animate-divider {
  animation: growWidth 1.2s ease-out forwards;
}
</style>
