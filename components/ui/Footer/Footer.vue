<script setup>
import Link from '@/components/ui/Link/Link.vue'
import Divider from '@/components/ui/Menu/Divider/Divider.vue'

// Reactive data
const email = ref('')

// Static data
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
  'Editorial Team',
  'Careers',
  'Contact',
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

// Methods
function handleSubscribe() {
  if (email.value.trim()) {
    console.log('Subscribing email:', email.value)
    // Add your newsletter subscription logic here
    email.value = ''
  }
}

// get current year as string
const currentYear = new Date().getFullYear().toString()
</script>

<template>
  <div class="px-4 md:px-12">
    <Divider />
  </div>
  <footer class="from-gray-900 via-gray-900 to-black text-white bg-gradient-to-br">
    <div class="px-4 py-16 md:px-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 mb-12 gap-12 lg:grid-cols-12">
        <!-- Brand Section -->
        <div class="color-gray-12 lg:col-span-4 space-y-6">
          <div>
            <h2 class="mb-4 text-3xl font-extralight tracking-wider">
              TecNews
            </h2>
            <p class="text-gray-300 font-light leading-relaxed">
              Delivering cutting-edge technology insights and analysis for the modern digital landscape.
            </p>
          </div>

          <!-- Newsletter -->
          <div class="space-y-4">
            <h3 class="text-lg color-mint-11 font-medium tracking-wide">
              Stay Informed
            </h3>
            <div class="group flex <lg:max-w-90">
              <input
                v-model="email"
                :class="useClsx(
                  'placeholder:color-gray-9 placeholder:font-light placeholder:tracking-tight',
                  'group-focus-within:outline-none group-focus-within:ring group-focus-within:ring-mint-12',
                  'h-10 flex-1 border border-solid border-gray-8',
                  'rounded-full rounded-tr-none rounded-br-none',
                  'bg-gray-2 px-3 py-2 b-r-none ',
                )"
                placeholder="Enter your email"
                type="email"
              >
              <button
                :class="useClsx(
                  'h-10 w-10 flex shrink-0 items-center justify-center',
                  'focus-visible:outline-none',
                  'rounded-full group-focus-within:ring-3 group-focus-within:ring-mint-12  rounded-tl-none rounded-bl-none',
                  'bg-mint-12 transition-colors',
                )"
                @click="handleSubscribe"
              >
                <Icon
                  class="size-4 color-mint-1 md:size-6"
                  name="ri:arrow-right-line"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="grid grid-cols-2 gap-8 lg:col-span-8 md:grid-cols-4">
          <div class="space-y-4">
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

          <div class="space-y-4">
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

          <div class="space-y-4">
            <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
              Company
            </h3>
            <nav class="space-y-3">
              <Link
                v-for="item in company"
                :key="item"
                class="w-fit flex p-1 color-gray-11 font-light transition-colors -m-1 hover:color-mint-12"
                href="#"
              >
                {{ item }}
              </Link>
            </nav>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm color-mint-12 font-semibold tracking-wider uppercase">
              Connect
            </h3>
            <div class="w-full flex items-center space-x-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.href"
                class="inline-flex p-1 color-pureBlack transition-colors -m-1 dark:color-pureWhite hover:color-mint-12 focus-visible:outline-none focus-visible:ring focus-visible:ring-mint-8"
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
      <Divider />

      <!-- Bottom Section -->
      <div class="flex flex-col items-center justify-between pt-8 md:flex-row space-y-4 md:space-y-0">
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
</template>
