<template>
  <div>
    <NuxtRouteAnnouncer />
    <main>
      <h1>Nuxt 4 template</h1>
      <section>
        <h2>Pinia store</h2>
        <p>Count: {{ counter.count }}</p>
        <button
          type="button"
          class="bg-brand text-white p-token rounded-card"
          @click="counter.increment()"
        >
          +1
        </button>
      </section>
      <section class="demo-card">
        <h2>NuxtImg</h2>
        <NuxtImg src="/demo.png" width="480" alt="Demo gradient" />
      </section>
      <section class="demo-panel">
        <h2>Design tokens</h2>
        <p>Tailwind v4 utilities, @apply entry and injected SCSS members.</p>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore()
</script>

<style lang="scss" scoped>
.demo-panel {
  @include card;
  border: 1px solid rgba($brand, 0.25);
  font-size: fluid(14, 18);
}
</style>
