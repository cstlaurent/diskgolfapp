<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const route = useRoute()
const game = ref({})
const playing = ref({})
const gameId = route.params.id
const savedGame = ref([])

async function getGameToPlay() {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${gameId}`)
  console.log('game', gamesResponse)
  const gameToPlay = await gamesResponse.json()
  return gameToPlay
}
// function pour modifier les players en playing players (avec score)
//dans un boucle

function createPlaying() {
  const playingArr = []
  for (const player of game.value.players) {
    player.score = { h1: 0, h2: 0, h3: 0 }

    playingArr.push(player)
  }
  return playingArr
}

onMounted(async () => {
  game.value = await getGameToPlay()
  playing.value = createPlaying()
})

// //post une partie avec PLAYERID+SCORE+GAMEID  pour chaque players
// function saveGame() {
//   console.log('saved')
//   for (const play of playing.value) {

//     }
//     console.log('testtesttest', playersaved)
//   }
//   // savedGame.value.push(game.value.players[0].score)
// }
</script>

<template>
  <!-- <div>GAME===={{ game }}</div>

  <div>GAME.PLAYERS ===={{ game.players }}</div> -->
  <div>PLAYING ===={{ playing }}</div>
  <br />
  <br />
  <br />
  <div>gameeeeeeee= {{ game }}</div>
  <div class="text-center">
    <button>h1</button>
    <button>h2</button>
    <button>h3</button>
    <button>h4</button>
    <button>h5</button>
  </div>
  <div class="w-screen bg-gray-200 flex flex-row p-3 mt-32 my-5">
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
          <div>{{}} {{ game.date }}</div>

          <div
            v-for="players in playing"
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
            <div v-for="points in players.score">
              <p>{{ points }}</p>
              <h2 class="text-5xl">{{}}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <button
      @click="saveGame"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-52"
    >
      Save Game
    </button>
    <p>{{ savedGame }}</p>
  </div>
</template>
