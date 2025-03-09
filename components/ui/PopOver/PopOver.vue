<script lang="ts" setup>
import { PopoverArrow, PopoverClose, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger
      aria-label="Update dimensions"
      class="bg-white focus:shadow-black hover:bg-stone-50 h-[35px] w-[35px] inline-flex cursor-default items-center justify-center border rounded-full text-grass11 shadow-sm focus:shadow-[0_0_0_2px] focus:outline-none dark:focus:shadow-green8"
    >
      <Icon name="radix-icons:mixer-horizontal" />
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side-offset="5"
        class="bg-white will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] border rounded-lg p-5 shadow-sm"
        side="bottom"
      >
        <div class="flex flex-col gap-2.5">
          <p class="mb-2.5 text-sm text-mauve12 font-semibold leading-[19px]">
            Dimensions
          </p>
          <fieldset class="flex items-center gap-5">
            <label
              class="w-[75px] text-xs text-grass11"
              for="width"
            > Width </label>
            <input
              id="width"
              class="bg-stone-50 h-[25px] w-full inline-flex flex-1 items-center justify-center rounded px-2.5 text-xs text-grass11 leading-none shadow-[0_0_0_1px] shadow-green7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-green8"
            >
          </fieldset>
          <fieldset class="flex items-center gap-5">
            <label
              class="w-[75px] text-xs text-grass11"
              for="maxWidth"
            > Max. width </label>
            <input
              id="maxWidth"
              class="bg-stone-50 h-[25px] w-full inline-flex flex-1 items-center justify-center rounded px-2.5 text-xs text-grass11 leading-none shadow-[0_0_0_1px] shadow-green7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-green8"
            >
          </fieldset>
          <fieldset class="flex items-center gap-5">
            <label
              class="w-[75px] text-xs text-grass11"
              for="height"
            > Height </label>
            <input
              id="height"
              class="bg-stone-50 h-[25px] w-full inline-flex flex-1 items-center justify-center rounded px-2.5 text-xs text-grass11 leading-none shadow-[0_0_0_1px] shadow-green7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-green8"
            >
          </fieldset>
          <fieldset class="flex items-center gap-5">
            <label
              class="w-[75px] text-xs text-grass11"
              for="maxHeight"
            > Max. height </label>
            <input
              id="maxHeight"
              class="bg-stone-50 h-[25px] w-full inline-flex flex-1 items-center justify-center rounded px-2.5 text-xs text-grass11 leading-none shadow-[0_0_0_1px] shadow-green7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-green8"
            >
          </fieldset>
        </div>
        <PopoverClose
          aria-label="Close"
          class="absolute right-[8px] top-[8px] h-[25px] w-[25px] inline-flex cursor-default items-center justify-center rounded-full text-grass11 outline-none hover:bg-green4 focus:shadow-[0_0_0_2px] focus:shadow-green7"
        >
          <Icon name="radix-icons:cross-2" />
        </PopoverClose>
        <PopoverArrow class="fill-white stroke-gray-200" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
