<script setup>
import { collapsed, toggleSideBar, sidebarWidth } from './state'
import {
  ArrowNarrowRightIcon,
  HomeIcon,
  UserIcon,
  PlayIcon,
  GlobeIcon,
} from '@heroicons/vue/solid'
</script>

<template>
  <div
    class="fixed top-0 left-0 bottom-0 float-left bg-sky-700 p-1 transition-all"
    :style="{ width: sidebarWidth }"
  >
    <div class="ml-1">
      <ArrowNarrowRightIcon
        @click="toggleSideBar"
        class="h-5 w-5 cursor-pointer text-blue-100"
      />
    </div>

    <div
      v-if="collapsed === false"
      class="font-Oswald flex-col text-center text-white"
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
    <div v-else class="text-white">
      <div class="my-10 text-2xl">
        <router-link to="/"><HomeIcon /></router-link>
      </div>

      <div class="my-10 text-2xl">
        <router-link to="/games"><PlayIcon /></router-link>
      </div>
      <div class="my-10 text-2xl">
        <router-link to="/players"><UserIcon /></router-link>
      </div>
      <div class="my-10 text-2xl">
        <router-link to="/Courses"><GlobeIcon /></router-link>
      </div>
    </div>
  </div>
</template>
