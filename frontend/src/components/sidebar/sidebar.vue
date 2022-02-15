<script setup>
import { collapsed, toggleSideBar, sidebarWidth } from './state'
</script>

<template>
  <div
    class="fixed top-0 left-0 bottom-0 float-left bg-stone-500 p-1 transition-all"
    :style="{ width: sidebarWidth }"
  >
    <button class="" @click="toggleSideBar">x</button>

    <div
      v-if="collapsed === false"
      class="bg-green flex-col text-center font-bold text-white"
    >
      <div class="mt-32 mb-10 text-2xl">
        <router-link @click="collapsed = true" to="/">Home</router-link>
      </div>
      <div class="my-10 text-2xl">
        <router-link @click="collapsed = true" to="/games">Games</router-link>
      </div>
      <div class="my-10 text-2xl">
        <router-link @click="collapsed = true" to="/players"
          >Players</router-link
        >
      </div>
      <div class="my-10 text-2xl">
        <router-link @click="collapsed = true" to="/Courses"
          >Courses</router-link
        >
      </div>
    </div>
  </div>
</template>
