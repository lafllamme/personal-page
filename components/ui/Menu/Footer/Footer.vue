<template>
  <div class="geist-regular mt-auto pt-6 text-xs md:text-sm">
    <div
      :class="useClsx(
        'flex items-center justify-between border-t',
        'border-gray-7A border-solid pt-6',
      )"
    >
      <button
        :class="useClsx(
          'group focus:outline-none focus:ring focus:ring-mint-8 focus:ring-offset-2',
          'transform transition-transform duration-300 ease-out hover:scale-105',
          'transition-colors duration-300 ease-out hover:text-mint-11',
          'ring-offset-pureWhite dark:ring-offset-pureBlack',
        )"
      >
        <span>© 2025 TecNews</span>
      </button>
      <button
        :class="useClsx(
          'focus:ring-mint-8 dark:ring-offset-pureBlack',
          'group flex items-center gap-1 tracking-wider uppercase',
          'ring-offset-pureWhite focus:outline-none focus:ring focus:ring-offset-2',
        )"
      >
        Contact
        <Icon
          class="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-1.5 group-hover:color-mint-11"
          name="ri:arrow-right-line"
        />
      </button>
    </div>
  </div>
</template>
