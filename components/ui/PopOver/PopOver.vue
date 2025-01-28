<template>
  <PopoverRoot>
    <PopoverTrigger
      :class="useClsx(
        'inline-flex items-center justify-center',
        'text-[15px] leading-none font-medium',
        'rounded-[4px] px-[15px] py-0',
        'h-[35px] !bg-pureWhite color-violet-11',
        'shadow-[0_2px_10px_var(--un-preset-radix-black7A)]',
        'hover:bg-mauve-3 focus:shadow-[0_0_0_2px_var(--un-preset-radix-black12A)]',
      )
      "
    >
      More info
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :class="useClsx(
          'bg-pureWhite rounded-[4px] p-[20px] w-[260px]',
          'text-[15px] leading-none',
          'color-violet-11',
          'shadow-[var(--un-preset-radix-black7A)_0px_10px_38px_-10px,_var(--un-preset-radix-black5A)_0px_10px_20px_-15px]',
          'focus:outline-none focus:shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px,_0_0_0_2px_var(--violet-7)]',
        )
        "
      >
        Some more info...
        <PopoverClose />
        <PopoverArrow class="fill-pureWhite" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
<!-- No style block because we use UnoCSS stylings -->
