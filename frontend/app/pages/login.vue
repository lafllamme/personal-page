<script setup lang="ts">
useHead({
  title: 'Login',
})
</script>

<template>
  <section class="relative min-h-[100svh] overflow-hidden bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="pointer-events-none absolute left-10 h-72 w-72 rounded-full from-pureBlack/10 via-transparent to-transparent bg-gradient-to-br blur-3xl -top-24 dark:from-pureWhite/10" />
    <div class="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full from-teal-11/20 via-transparent to-transparent bg-gradient-to-tr blur-2xl" />

    <div class="grid mx-auto max-w-6xl w-full items-center gap-10 px-6 pb-20 pt-28 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 class="text-[clamp(2.6rem,8vw,5.2rem)] leading-[0.95] tracking-tight uppercase">
          <span class="zalando-sans-expanded block font-semibold">Welcome back.</span>
          <span class="font-baskerville block color-pureBlack/70 italic dark:color-pureWhite/70">Pick up the signal.</span>
        </h1>
        <p class="mt-6 max-w-xl text-base color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
          Log in to your private newsroom: saved dossiers, custom trackers, and the on-call briefing
          library curated just for you.
        </p>
        <div class="mt-10 space-y-4">
          <div class="border border-pureBlack/10 rounded-2xl bg-pureWhite/70 p-5 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
            <div class="text-xs color-pureBlack/60 tracking-[0.28em] uppercase dark:color-pureWhite/60">
              Today
            </div>
            <div class="mt-2 text-lg font-semibold">
              Market pulse: compute spend stabilizes
            </div>
            <p class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
              Editorial desk notes on the shift from training to inference infrastructure.
            </p>
          </div>
          <div class="border border-pureBlack/10 rounded-2xl bg-pureWhite/70 p-5 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
            <div class="text-xs color-pureBlack/60 tracking-[0.28em] uppercase dark:color-pureWhite/60">
              Saved
            </div>
            <div class="mt-2 text-lg font-semibold">
              Your private watchlist
            </div>
            <p class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
              Seven companies and four sectors flagged for rapid-move updates.
            </p>
          </div>
        </div>
      </div>

      <div class="border border-pureBlack/10 rounded-3xl bg-pureWhite/70 p-8 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
        <div class="text-xs color-pureBlack/60 tracking-[0.32em] uppercase dark:color-pureWhite/60">
          Member login
        </div>
        <h2 class="mt-3 text-2xl font-semibold">
          Access your briefing room
        </h2>
        <p class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
          Use your member email to continue. We will never share your details.
        </p>
        <form class="mt-8 space-y-5">
          <label class="block text-xs color-pureBlack/60 tracking-[0.26em] uppercase dark:color-pureWhite/60">
            Email
            <input
              type="email"
              placeholder="you@signal.news"
              class="mt-2 w-full border border-pureBlack/20 rounded-2xl bg-transparent px-4 py-3 text-sm outline-none transition dark:border-pureWhite/30 focus:border-pureBlack/70 dark:focus:border-pureWhite"
            >
          </label>
          <label class="block text-xs color-pureBlack/60 tracking-[0.26em] uppercase dark:color-pureWhite/60">
            Password
            <input
              type="password"
              placeholder="••••••••"
              class="mt-2 w-full border border-pureBlack/20 rounded-2xl bg-transparent px-4 py-3 text-sm outline-none transition dark:border-pureWhite/30 focus:border-pureBlack/70 dark:focus:border-pureWhite"
            >
          </label>
          <button class="w-full rounded-full bg-pureBlack px-6 py-3 text-sm color-pureWhite tracking-widest uppercase transition dark:bg-pureWhite hover:bg-pureBlack/80 dark:color-pureBlack dark:hover:bg-pureWhite/80">
            Enter newsroom
          </button>
        </form>
        <div class="mt-5 flex items-center justify-between text-xs color-pureBlack/60 tracking-[0.2em] uppercase dark:color-pureWhite/60">
          <span>Forgot password</span>
          <span>Request access</span>
        </div>
      </div>
    </div>
  </section>
</template>
