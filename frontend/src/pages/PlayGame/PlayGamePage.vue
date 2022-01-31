<script setup>
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const game = ref({})
const gameId = route.params.id
const currentHole = ref(1)
const holeSetup = ref(0)

async function getGameToPlay() {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${gameId}`)
  console.log('game', gamesResponse)
  const gameToPlay = await gamesResponse.json()
  return gameToPlay
}

function increaseScore(currentHole, player) {
  let hHole = `h${currentHole}`
  let selectedPlayer = player
  selectedPlayer.score[hHole]++
}

function decreaseScore(currentHole, player) {
  let hHole = `h${currentHole}`
  let selectedPlayer = player
  selectedPlayer.score[hHole]--
}

// function pour modifier game (avec score)
//dans un boucle

function setupGame() {
  game.value.course = game.value.course[0]
  for (const player of game.value.players) {
    player.score = {}
    for (let i = 1; i <= holeSetup.value; i++) {
      player.score[`h${i}`] = 0
    }
  }
}

onMounted(async () => {
  game.value = await getGameToPlay()
  //Pull hole setup
  holeSetup.value = game?.value?.course[0].setup
  setupGame()
})
</script>

<template>
  <div>GAME= {{ game }}</div>

  <div
    v-if="game.players?.[0]"
    v-for="hole in holeSetup"
    class="text-center inline-flex"
  >
    <button
      @click="currentHole = hole"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-10"
    >
      {{ hole }}
    </button>
  </div>
  <div class="w-screen bg-gray-200 flex flex-row p-3 my-5">
    <div class="mx-auto w-2/3">
      <!-- Profile Card -->
      <div
        class="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased"
        style="
          background-image: url('https://i.redd.it/mqvsmm8595cz.jpg');
          background-size: cover;
          background-blend-mode: multiply;
        "
      >
        <div class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10">
          <div>{{ game?.course?.name || '' }} {{ game.date }}</div>

          <div
            v-for="players in game.players"
            class="basis-1/4 border-2 border-white rounded-lg"
          >
            <h2>{{ players.name }}</h2>

            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="increaseScore(currentHole, players)"
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="decreaseScore(currentHole, players)"
            >
              Decrease Score
            </button>
            <div>
              <p>{{}}</p>
              <h2 class="text-5xl">{{}}</h2>
            </div>
            <div>{{ players.score.h1 }}</div>
          </div>
        </div>
        <!-- ----------------------------------------h2 -->
      </div>
    </div>
  </div>
  <div>
    {{ currentHole }}
  </div>
</template>
