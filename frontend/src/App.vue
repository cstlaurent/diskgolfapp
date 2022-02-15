<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Nav from './components/Nav.vue'
import Sidebar from './components/sidebar/sidebar.vue'
import { sidebarWidth } from './components/sidebar/state'
</script>

<template>
  <!-- <Nav class="border-2 border-blue-400 rounded-xl py-2" /> -->
  <Sidebar />

  <!-- ----------------------------------------------------------------------------------------- -->
  <!-- // pourquoi la class du router view??? -->
  <div class="transition-all" :style="{ 'margin-left': sidebarWidth }">
    <router-view></router-view>
  </div>
</template>

<style></style>
