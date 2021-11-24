<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Nav from './components/Nav.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <Nav />
    <router-view class="p-4 bg-red-300"></router-view>
  </div>
</template>
