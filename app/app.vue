<template>
  <div>
    <NuxtRouteAnnouncer />
    <main>
      <h1>Nuxt 4 template</h1>
      <section>
        <h2>Pinia store</h2>
        <p>Count: {{ counter.count }}</p>
        <button type="button" @click="counter.increment()">+1</button>
      </section>
      <section>
        <h2>NuxtImg</h2>
        <NuxtImg src="/demo.png" width="480" alt="Demo gradient" />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore()
</script>
