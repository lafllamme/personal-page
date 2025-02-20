<script setup lang="ts">
import CardBody from '@/components/ui/Card/CardBody.vue'
import CardContainer from '@/components/ui/Card/CardContainer.vue'
import CardItem from '@/components/ui/Card/CardItem.vue'
</script>

<template>
  <ClientOnly>
    <CardContainer>
      <CardBody
        class="group/card relative size-auto border border-pureBlack/[0.1] rounded-xl bg-gray-5 p-6 sm:w-[30rem] dark:border-pureWhite/[0.2] dark:bg-pureBlack dark:hover:shadow-2xl dark:hover:shadow-jade-5/[0.1]"
      >
        <CardItem
          :translate-z="50"
          class="text-xl text-slate-11A font-bold dark:text-pureWhite"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translate-z="60"
          class="dark:text-neutral-300 mt-2 max-w-sm text-sm text-slate-10A"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem
          :translate-z="100"
          class="mt-4 w-full"
        >
          <NuxtImg
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            class="h-60 w-full rounded-xl object-cover shadow-jade-7A/[0.5] group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div class="mt-20 flex items-center justify-between">
          <CardItem
            :translate-z="20"
            as="a"
            target="__blank"
            class="rounded-xl px-4 py-2 text-xs font-normal dark:text-pureWhite"
            @click="navigateTo('/')"
          >
            Visit →
          </CardItem>
          <CardItem
            :translate-z="20"
            as="button"
            class="rounded-xl bg-pureBlack px-4 py-2 text-xs text-pureWhite font-bold dark:bg-pureWhite dark:text-pureBlack"
            @click="navigateTo('/')"
          >
            Get Started
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  </ClientOnly>
</template>
