<script setup>
import { onMounted, ref } from 'vue'

const players = ref([])

onMounted(async () => {
  const playersResponse = await fetch('http://127.0.0.1:7778/')

  console.log('Players', playersResponse)

  const p = await playersResponse.json()

  players.value = p.players
})
</script>

<template>
  <div>Player List Page</div>
  <div v-for="pl in players">
    {{ pl }}
  </div>
</template>
