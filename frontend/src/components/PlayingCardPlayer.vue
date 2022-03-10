<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
  gameId: String,
  hole: Number,
  player: Object,
})
const specificScore = ref()

onMounted(async () => {
  await getScore(props.player._id, props.hole, props.gameId)
})

watch(
  () => props?.hole,
  (last, newHole) => {
    if (last !== newHole) getScore(props.player._id, props.hole, props.gameId)
  }
)

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

  specificScore.value = requestedScore
  return requestedScore
}
async function increaseScore() {
  specificScore.value++
  await saveScore(
    props.player._id,
    props.hole,
    specificScore.value,
    props.gameId
  )
}

async function decreaseScore() {
  specificScore.value--
  await saveScore(
    props.player._id,
    props.hole,
    specificScore.value,
    props.gameId
  )
}
const emit = defineEmits(['scoreincreased', 'scoredecreased'])
</script>

<template>
  <div class="m-2 rounded-lg border-2 border-white text-center">
    <h2 v-if="player" class="mt-6 text-center text-xl font-bold">
      {{ player.name }}
    </h2>

    <button
      class="mt-8 rounded-lg bg-gray-500 px-2 py-1 transition hover:bg-gray-600"
      @click="increaseScore"
    >
      Increase Score
    </button>
    <button
      class="mt-2 rounded-lg bg-gray-500 px-2 py-1 transition hover:bg-gray-600"
      @click="decreaseScore"
    >
      Decrease Score
    </button>
    <div>
      <h2 class="text-5xl">{{}}</h2>
    </div>
    <div class="mt-3 text-center text-4xl font-bold">{{ specificScore }}</div>
  </div>
</template>
