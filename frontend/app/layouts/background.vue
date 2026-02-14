<script setup>
import Header from '~/components/ui/Header/Header.vue'
import Shader from '~/components/ui/Shaders/Shader.vue'
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Background container -->
    <div class="absolute inset-0 z-0">
      <Shader />
    </div>

    <!-- Main Content -->
    <div
      class="page-transition-root relative z-10 overflow-y-auto"
    >
      <Header />
      <main>
        <slot name="default" />
      </main>
    </div>
  </div>
</template>
