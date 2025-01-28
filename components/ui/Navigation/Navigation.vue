<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import {
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from 'radix-vue'
import { ref } from 'vue'
import MenuListItem from './Menu/MenuListItem.vue'

const currentTrigger = ref('')
</script>

<template>
  <NavigationMenuRoot
    v-model="currentTrigger"
    class="relative z-[1] w-full flex justify-center"
  >
    <NavigationMenuList class="center m-0 flex list-none rounded-[6px] bg-pureWhite p-1 shadow-[0_2px_10px] shadow-black7A">
      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
        >
          Learn
          <Icon
            class="relative top-[1px] text-green10 transition-transform duration-[250ms] ease-in group-data-[state=open]:-rotate-180"
            icon="radix-icons:caret-down"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent
          class="absolute left-0 top-0 w-full sm:w-auto data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft"
        >
          <ul class="one grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-cols-[0.75fr_1fr] sm:w-[500px]">
            <li class="grid row-span-3">
              <NavigationMenuLink as-child>
                <a
                  class="h-full w-full flex flex-col select-none justify-end rounded-[6px] from-green9 to-teal9 bg-gradient-to-b p-[25px] no-underline outline-none focus:shadow-[0_0_0_2px] focus:shadow-green7"
                  href="/"
                >
                  <img
                    class="w-16"
                    src="https://www.radix-vue.com/logo.svg"
                  >
                  <div class="mb-[7px] mt-4 text-[18px] text-pureWhite font-medium leading-[1.2]">Radix Primitives</div>
                  <p class="text-[14px] text-mauve4 leading-[1.3]">Unstyled, accessible components for Vue.</p>
                </a>
              </NavigationMenuLink>
            </li>

            <MenuListItem
              href="https://stitches.dev/"
              title="Stitches"
            >
              CSS-in-JS with best-in-class developer experience.
            </MenuListItem>
            <MenuListItem
              href="/colors"
              title="Colors"
            >
              Beautiful, thought-out palettes with auto dark mode.
            </MenuListItem>
            <MenuListItem
              href="https://icons.radix-ui.com/"
              title="Icons"
            >
              A crisp set of 15x15 icons, balanced and consistent.
            </MenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger
          class="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
        >
          Overview
          <Icon
            class="relative top-[1px] text-green10 transition-transform duration-[250ms] ease-in group-data-[state=open]:-rotate-180"
            icon="radix-icons:caret-down"
          />
        </NavigationMenuTrigger>
        <NavigationMenuContent class="absolute left-0 top-0 w-full sm:w-auto data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft">
          <ul class="grid m-0 list-none gap-x-[10px] p-[22px] sm:grid-flow-col sm:grid-rows-3 sm:w-[600px]">
            <MenuListItem
              href="/docs/primitives/overview/introduction"
              title="Introduction"
            >
              Build high-quality, accessible design systems and web apps.
            </MenuListItem>
            <MenuListItem
              href="/docs/primitives/overview/getting-started"
              title="Getting started"
            >
              A quick tutorial to get you up and running with Radix Primitives.
            </MenuListItem>
            <MenuListItem
              href="/docs/primitives/guides/styling"
              title="Styling"
            >
              Unstyled and compatible with any styling solution.
            </MenuListItem>
            <MenuListItem
              href="/docs/primitives/guides/animation"
              title="Animation"
            >
              Use CSS keyframes or any animation library of your choice.
            </MenuListItem>
            <MenuListItem
              href="/docs/primitives/overview/accessibility"
              title="Accessibility"
            >
              Tested in a range of browsers and assistive technologies.
            </MenuListItem>
            <MenuListItem
              href="/docs/primitives/overview/releases"
              title="Releases"
            >
              Radix Primitives releases and their changelogs.
            </MenuListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          class="block select-none rounded-[4px] px-3 py-2 text-[15px] text-grass11 font-medium leading-none no-underline outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-green7"
          href="https://github.com/unovue/radix-vue"
        >
          Github
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuIndicator
        class="transition-[all,transform_250ms_ease] top-full z-[1] h-[10px] flex items-end justify-center overflow-hidden duration-200 data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn data-[state=hidden]:opacity-0"
      >
        <div class="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-pureWhite" />
      </NavigationMenuIndicator>
    </NavigationMenuList>

    <div class="absolute left-0 top-full w-full flex perspective-[2000px] justify-center">
      <NavigationMenuViewport
        class="transition-[width,_height] relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[10px] bg-pureWhite duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)] data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn"
      />
    </div>
  </NavigationMenuRoot>
</template>
