<script lang="ts" setup>
function handleEnter() {
  navigateTo('/about')
}

const { t } = useI18n()
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div>
      <button
        :class="useClsx(
          'flex items-center justify-center',
          'border-pureBlack dark:border-pureWhite border-2',
          'rounded-lg bg-pureWhite dark:bg-pureBlack px-4 py-2 text-2xl',
          'text-mint-12',
          'font-thin font-mono uppercase antialiased space-x-2',
          'shadow-[6px_8px_100px_6px] shadow-mint-7',
          'focus-visible:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-black-12A',
          'transition-colors duration-900 ease-[cubic-bezier(0.77,0,0.18,1)]',
        )"
        @click="handleEnter"
        @keydown.enter="handleEnter"
      >
        <NuxtLinkLocale
          aria-label="My Projects"
          tabindex="-1"
          to="/about"
        >
          {{ t('projects') }}
        </NuxtLinkLocale>
        <Icon class="color-black" name="uil:github" />
      </button>
    </div>
  </div>
</template>

<i18n lang="yaml">
de:
  hello: "Hallo Welt!"
  projects: "Meine Projekte"
en:
  hello: "Hello world!"
  projects: "My Projects"
fr:
  hello: "Bonjour le monde!"
  projects: "Mes projets"
ja:
  hello: "こんにちは世界！"
  projects: "私のプロジェクト"
zh:
  hello: "你好，世界！"
  projects: "我的项目"
pt:
  hello: "Olá mundo!"
  projects: "Meus Projetos"
es:
  hello: "¡Hola mundo!"
  projects: "Mis Proyectos"
pl:
  hello: "Witaj świecie!"
  projects: "Moje Projekty"
da:
  hello: "Hej verden!"
  projects: "Mine Projekter"
cs:
  hello: "Ahoj světe!"
  projects: "Moje Projekty"
nl:
  hello: "Hallo wereld!"
  projects: "Mijn Projecten"
el:
  hello: "Γειά σου κόσμε!"
  projects: "Τα έργα μου"
tr:
  hello: "Merhaba dünya!"
  projects: "Projelerim"
ko:
  hello: "안녕하세요, 세계!"
  projects: "내 프로젝트"
uk:
  hello: "Привіт, світ!"
  projects: "Мої проекти"
ar:
  hello: "مرحبا بالعالم!"
  projects: "مشاريعي"
</i18n>
