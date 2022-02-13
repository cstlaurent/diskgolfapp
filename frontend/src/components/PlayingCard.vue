<script setup>
import { ref } from 'vue'
const props = defineProps({
  game: Object,
  currentHole: Number,
  hHole: String,
})
const specificScore = ref()

async function getScore(playerId, hole, gameId) {
  const scoreResponse = await fetch(
    `http://127.0.0.1:7778/playergames/${gameId}/${playerId}/${hole}/score`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const requestedScore = await scoreResponse.json()
  console.log('requested score=== ', requestedScore)
  specificScore.value = requestedScore
  return requestedScore
}
function increaseScore(currentHole, players) {
  emit('scoreincreased', currentHole, players)
}

function decreaseScore(currentHole, players) {
  emit('scoredecreased', currentHole, players)
}
const emit = defineEmits({
  scoreincreased: null,
  scoredecreased: null,
})
</script>

<template>
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
          <div class="text-xl font-bold">
            {{ props.game?.course?.name || '' }} {{ props?.game?.date }}
            <p class="mt-10">hole</p>
            <p class="text-7xl">{{ props.currentHole }}</p>
          </div>

          <div
            v-for="players in props?.game?.players"
            class="basis-1/4 border-2 border-white rounded-lg"
          >
            <h2 class="text-center font-bold mt-6 text-xl">
              {{ players.name }}
            </h2>

            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800 mt-8"
              @click="increaseScore(props.currentHole, players)"
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="decreaseScore(props.currentHole, players)"
            >
              Decrease Score
            </button>
            <div>
              <h2 class="text-5xl">{{}}</h2>
            </div>
            <div class="text-4xl text-center mt-3">
              <!-- je dois utiliser ma fonction get specific -->
              <!-- {{ players.score[hHole] }} -->
              <!-- {{ getScore(players.id, currentHole, props.game.id) }} -->

              <!-- {{ players.id }} test -->
              <!-- {{ props.game.id }} -->
              <!-- {{ currentHole }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
