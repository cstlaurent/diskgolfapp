<script setup>
import { ref } from 'vue'
const test = ref('')
import stats from './Stats.vue'
</script>

<template>
  <div>
    <div></div>
    <div>{{ test }}</div>
    <div><stats /></div>
  </div>
</template>

<style></style>
