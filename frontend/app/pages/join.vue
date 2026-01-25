<script setup lang="ts">
useHead({
  title: 'Join',
})
</script>

<template>
  <section class="relative overflow-hidden bg-pureWhite color-pureBlack dark:bg-pureBlack dark:color-pureWhite">
    <div class="pointer-events-none absolute -top-32 right-0 h-72 w-72 rounded-full bg-gradient-to-br from-teal-11/20 via-transparent to-transparent blur-2xl" />
    <div class="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-pureBlack/10 via-transparent to-transparent blur-3xl dark:from-pureWhite/10" />

    <div class="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
      <h1 class="text-[clamp(2.8rem,9vw,5.8rem)] uppercase leading-[0.95] tracking-tight">
        <span class="zalando-sans-expanded block font-semibold">Join the Signal.</span>
        <span class="font-baskerville block italic color-pureBlack/70 dark:color-pureWhite/70">Own the tech narrative.</span>
      </h1>
      <p class="mt-6 max-w-2xl text-base color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
        Step into a newsroom built for modern technologists: fast, precise, and obsessive about what ships
        next. Your membership fuels original reporting, private briefings, and a front-row seat to the next
        wave of platform shifts.
      </p>

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <div class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.32em] color-pureBlack/60 dark:color-pureWhite/60">Starter</div>
          <div class="mt-3 text-2xl font-semibold">Signal Reader</div>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Daily briefs, weekly synthesis, and access to the cleanest index of product launches.
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Early-access industry snapshots
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Member-only PDF editions
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Weekly field notes
            </li>
          </ul>
        </div>
        <div class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.32em] color-pureBlack/60 dark:color-pureWhite/60">Core</div>
          <div class="mt-3 text-2xl font-semibold">Signal Insider</div>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Deep dives, full interviews, and quarterly market dossiers curated by the editorial desk.
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Founder call transcripts
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Strategic memos &amp; models
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Priority event invites
            </li>
          </ul>
        </div>
        <div class="rounded-3xl border border-pureBlack/10 bg-pureWhite/70 p-6 backdrop-blur-sm dark:border-pureWhite/15 dark:bg-pureBlack/50">
          <div class="text-xs uppercase tracking-[0.32em] color-pureBlack/60 dark:color-pureWhite/60">Studio</div>
          <div class="mt-3 text-2xl font-semibold">Signal Council</div>
          <p class="mt-3 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
            Private roundtables, editorial steering input, and a concierge briefing team.
          </p>
          <ul class="mt-4 space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Live leadership salons
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              Custom research sprints
            </li>
            <li class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-teal-11" />
              White-glove briefing desk
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-14 rounded-3xl border border-pureBlack/10 bg-gradient-to-r from-pureWhite via-pureWhite/60 to-pureWhite/20 p-8 dark:border-pureWhite/15 dark:from-pureBlack dark:via-pureBlack/80 dark:to-pureBlack/60">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div class="text-xs uppercase tracking-[0.28em] color-pureBlack/60 dark:color-pureWhite/60">Membership</div>
            <div class="mt-2 text-2xl font-semibold">Get the newsroom in your inbox.</div>
            <p class="mt-2 text-sm color-pureBlack/70 leading-relaxed dark:color-pureWhite/70">
              We send one high-signal dispatch each week, plus live updates when a story breaks.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <button class="rounded-full border border-pureBlack/40 px-6 py-3 text-sm uppercase tracking-widest transition hover:border-pureBlack/70 dark:border-pureWhite/50 dark:hover:border-pureWhite">
              Request invite
            </button>
            <button class="rounded-full bg-pureBlack px-6 py-3 text-sm uppercase tracking-widest color-pureWhite transition hover:bg-pureBlack/80 dark:bg-pureWhite dark:color-pureBlack dark:hover:bg-pureWhite/80">
              Start membership
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
