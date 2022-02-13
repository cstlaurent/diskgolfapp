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

async function saveScore(playerId, hole, score, gameId) {
  const saveScoreBody = {
    playerId: playerId,
    hole: hole,
    score: score,
    gameId: gameId,
  }
  const body = JSON.stringify(saveScoreBody)
  const scoreResponse = await fetch(
    `http://127.0.0.1:7778/playergames/${gameId}/score`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },

      body: body,
    }
  )
}

async function increaseScore(currentHole, player) {
  let hHole = `h${currentHole}`
  let selectedPlayer = player
  selectedPlayer.score[hHole]++
  await saveScore(player.id, currentHole, selectedPlayer.score[hHole], gameId)
}

async function decreaseScore(currentHole, player) {
  let hHole = `h${currentHole}`
  let selectedPlayer = player
  selectedPlayer.score[hHole]--
  await saveScore(player.id, currentHole, selectedPlayer.score[hHole], gameId)
}

// // je dois setup en utilisant mon get
// function setupGame() {
//   game.value.course = game.value.course[0]
//   for (const player of game.value.players) {
//     player.score = {}
//     for (let i = 1; i <= holeSetup.value; i++) {
//       player.score[`h${i}`] = 0
//     }
//   }
// }

onMounted(async () => {
  game.value = await getGameToPlay()
  //Pull hole setup
  holeSetup.value = game?.value?.course.setup
  //setupGame()
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
    @scoreincreased="increaseScore"
    @scoredecreased="decreaseScore"
    :game="game"
    :current-hole="currentHole"
    :hHole="hHole"
    :specific-score="specificScore"
  />

  <div>{{ hHole }}</div>
  <div>
    <button
      @click="getScore('-JNsUyQ0E7Hiujjx5icG-', 1, 'YdFZPHCB-nbJjI96dRdoz')"
    >
      GET SCOREE
    </button>
  </div>
</template>
