<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PlayingCard from '../../components/PlayingCard.vue'

const route = useRoute()
const game = ref({})
const gameId = route.params.id
const currentHole = ref(1)
const holeSetup = ref(0)
const hHole = ref('h1')
const specificScore = ref(0)

async function getGameToPlay() {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${gameId}`)
  console.log('game', gamesResponse)
  const gameToPlay = await gamesResponse.json()
  return gameToPlay
}

onMounted(async () => {
  game.value = await getGameToPlay()
  //Pull hole setup
  holeSetup.value = game?.value?.course.setup
})
</script>

<template>
  <div>GAME= {{ game }}</div>

  <div
    v-if="game.players?.[0]"
    v-for="hole in holeSetup"
    class="inline-flex text-center"
  >
    <button
      @click=";(currentHole = hole), (hHole = 'h' + hole)"
      class="w-10 rounded-full bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
    >
      {{ hole }}
    </button>
  </div>
  <PlayingCard
    :game="game"
    :current-hole="currentHole"
    :hHole="hHole"
    :specific-score="specificScore"
  />

  <div>{{ hHole }}</div>
  <div></div>
</template>
