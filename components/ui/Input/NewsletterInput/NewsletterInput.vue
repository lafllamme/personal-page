<script lang="ts" setup>
const hasInputFocus = ref(false)
const emailModel = defineModel({ type: String, default: '' })
const loading = ref(false)

interface Feedback {
  status: 'success' | 'error'
  message: string
}

const feedback = ref<Feedback | null>(null)

async function handleSubscribe() {
  const value = emailModel.value.trim()
  if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value)) {
    feedback.value = { status: 'error', message: 'Invalid email format' }
    return consola.error('Invalid email')
  }
  loading.value = true
  try {
    await $fetch('/api/newsletter/subscribe', {
      method: 'POST',
      body: { email: value },
    })
    feedback.value = { status: 'success', message: 'Subscribed successfully!' }
    consola.success('Subscribed!')
    emailModel.value = ''
  }
  catch (e: any) {
    consola.error('Error:', e.statusMessage || e.message || e)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative flex flex-col">
    <div class="group relative flex <lg:max-w-90">
      <input
        id="newsletter-email"
        v-model="emailModel"
        :class="useClsx(
          'placeholder:color-gray-9 placeholder:font-light placeholder:tracking-tight',
          'group-focus-within:outline-none group-focus-within:ring group-focus-within:ring-mint-12',
          'h-10 flex-1 border border-solid border-gray-8',
          'rounded-full rounded-tr-none rounded-br-none',
          'bg-gray-2 px-3 py-2 b-r-none peer',
        )"
        :disabled="loading"
        autocomplete="email"
        type="email"
        @blur="hasInputFocus = false"
        @focus="hasInputFocus = true"
      >
      <label
        v-show="!emailModel"
        :class="useClsx(
          hasInputFocus && 'slide-out-blurred-top',
          'color-gray-10 transition-all duration-300 ease-out',
          'pointer-events-none absolute left-4 top-1/2 transform',
          'peer-focus:top-4 -translate-y-1/2 animation-fill-forwards peer-focus:text-xs peer-focus:-translate-y-2',
        )"
        for="newsletter-email"
      >
        Enter your Email
      </label>
      <button
        :class="useClsx(
          'h-10 w-10 flex shrink-0 items-center justify-center',
          'focus-visible:outline-none',
          'rounded-full group-focus-within:ring-3 group-focus-within:ring-mint-12  rounded-tl-none rounded-bl-none',
          'bg-mint-12 transition-colors',
        )"
        :disabled="loading"
        @click="handleSubscribe"
      >
        <Icon
          v-show="!loading"
          class="size-4 color-mint-1 md:size-6"
          name="ri:arrow-right-line"
        />
        <Icon
          v-show="loading"
          class="size-4 animate-spin color-mint-1 md:size-6"
          name="svg-spinners:pulse-rings-3"
        />
      </button>
    </div>
    <div
      v-show="feedback"
      :class="useClsx(
        feedback?.status === 'success' ? 'color-teal-11' : 'color-crimson-10',
      )"
      class="jetbrains-mono-regular absolute left-1 top-5 flex translate-y-full animate-fade-in pt-1 text-sm font-semibold tracking-normal uppercase antialiased"
    >
      {{ feedback?.message }}
    </div>
  </div>
</template>
