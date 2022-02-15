<script setup>
import { ref } from 'vue'
const test = ref('')
import stats from './Stats.vue'
</script>

<template>
  <h1 class="font-Oswald pt-10 text-center text-5xl font-bold">
    AWESOME DISC GOLF APP
  </h1>

  <div>
    <div></div>

    <div><stats /></div>
  </div>
</template>

<style></style>
