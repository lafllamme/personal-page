<script lang="ts" setup>
import NavigationMobile from '~/components/ui/Navigation/Mobile/NavigationMobile.vue'

const { t } = useI18n()
</script>

<template>
  <header role="banner">
    <nav aria-labelledby="mainMenuLabel">
      <h2
        id="mainMenuLabel"
        class="sr-only"
      >
        {{ t('menu') }}
      </h2>
      <div>
        <!-- The actual site navigation -->
        <div class="flex items-center justify-center pt-3 <md:hidden" />
        <div class="md:hidden">
          <NavigationMobile />
        </div>
      </div>
    </nav>
  </header>
</template>

<i18n lang="yaml">
de:
  menu: "Hauptmenü"
en:
  menu: "Main Menu"
fr:
  menu: "Menu Principal"
ja:
  menu: "メインメニュー"
zh:
  menu: "主菜单"
pt:
  menu: "Menu Principal"
es:
  menu: "Menú Principal"
pl:
  menu: "Menu Główne"
da:
  menu: "Hovedmenu"
cs:
  menu: "Hlavní menu"
nl:
  menu: "Hoofdmenu"
el:
  menu: "Κύριο Μενού"
tr:
  menu: "Ana Menü"
ko:
  menu: "메인 메뉴"
uk:
  menu: "Головне меню"
</i18n>
