<script setup>
import { onMounted, ref } from 'vue'

const players = ref([])

onMounted(async () => {
  const playersResponse = await fetch('http://127.0.0.1:7778/players')

  console.log('Players', playersResponse)

  const p = await playersResponse.json()

  // p = {players: [...]}
  players.value = p.players
})
</script>

<template>
  <div class="text-4xl font-bold text-center bg-blue-200 mt-10 mb-48">
    PLAYERS
  </div>
  <div class="text-xl font-bold text-blue-500 ml-6" v-for="pl in players">
    {{ pl.name }}
  </div>
</template>
