<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const game = ref({})
const gameId = route.params.id
const currentHole = ref(1)
const holeSetup = ref('')

async function getGameToPlay() {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${gameId}`)
  console.log('game', gamesResponse)
  const gameToPlay = await gamesResponse.json()
  return gameToPlay
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
  <!-- <div
    v-for="(hole, key) in game.players[0].score"
    class="text-center inline-flex"
  >
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-10"
    >
      {{ key }}
    </button>
  </div> -->
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
        <div
          v-if="currentHole === 1"
          class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10"
        >
          <div>
            {{ game?.course?.name || '' }} {{ game.date }}

            <p>hole 1</p>
          </div>

          <div
            v-for="players in game.players"
            class="basis-1/4 border-2 border-white rounded-lg"
          >
            <!-- /////PLAYER 1------------------------ -->
            <!-- vfor -->

            <!-- <h2>{{ playing?.player1?.name || '' }}</h2> -->
            <h2>{{ players.name }}</h2>

            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h1++"
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h1--"
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
        <div
          v-if="currentHole === 2"
          class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10"
        >
          <div>
            {{}} {{ game.date }}
            <p>hole 2</p>
          </div>

          <div
            v-for="players in game.players"
            class="basis-1/4 border-2 border-white rounded-lg"
          >
            <!-- /////PLAYER 1------------------------ -->

            <h2>{{ players.name }}</h2>

            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h2++"
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h2--"
            >
              Decrease Score
            </button>
            <div>
              <p>{{ players.score.h2 }}</p>
              <h2 class="text-5xl">{{}}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button
      @click=""
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-52"
    >
      Save Game
    </button>
  </div>
</template>
