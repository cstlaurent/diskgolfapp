<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const game = ref({})
const playing = ref({})
const gameId = route.params.id
const savedGame = ref([])
const currentHole = ref(1)

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
    player.score = []
    for (let i = 1; i <= game.value.course[0].setup; i++) {
      player.score.push(`h${i}:0`)
    }

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
    <button @click="currentHole = 1">h1</button>
    <button @click="currentHole = 2">h2</button>
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
        <div
          v-if="currentHole === 1"
          class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10"
        >
          <div>
            {{}} {{ game.date }}
            <p>hole 1</p>
          </div>

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
            <div>
              <p>{{ players.score.h1 }}</p>
              <h2 class="text-5xl">{{}}</h2>
            </div>
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
            v-for="players in playing"
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
      @click="saveGame"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-52"
    >
      Save Game
    </button>
    <p>{{ savedGame }}</p>
  </div>
</template>
