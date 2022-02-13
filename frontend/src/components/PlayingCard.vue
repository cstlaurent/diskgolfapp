<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  game: Object,
  currentHole: Number,
  hHole: String,
})
const specificScore = ref()

onMounted(async () => {})

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
const emit = defineEmits(['scoreincreased', 'scoredecreased'])
</script>

<template>
  <div class="my-5 flex w-screen flex-row bg-gray-200 p-3">
    <div class="mx-auto w-2/3">
      <!-- Profile Card -->
      <div
        class="flex w-full flex-row flex-wrap rounded-lg bg-gray-600 p-3 antialiased shadow-lg"
        style="
          background-image: url('https://i.redd.it/mqvsmm8595cz.jpg');
          background-size: cover;
          background-blend-mode: multiply;
        "
      >
        <div class="ml-10 flex h-60 grid-cols-4 flex-row gap-10 text-white">
          <div class="text-xl font-bold">
            {{ props.game?.course?.name || '' }} {{ props?.game?.date }}
            <p class="mt-10">hole</p>
            <p class="text-7xl">{{ props.currentHole }}</p>
          </div>

          <div
            v-for="players in props?.game?.players"
            class="basis-1/4 rounded-lg border-2 border-white"
          >
            <h2 class="mt-6 text-center text-xl font-bold">
              {{ players.name }}
            </h2>

            <button
              class="mt-8 rounded-t-lg bg-gray-500 hover:bg-gray-800"
              @click="increaseScore(props.currentHole, players)"
            >
              Increase Score
            </button>
            <button
              class="rounded-t-lg bg-gray-500 hover:bg-gray-800"
              @click="decreaseScore(props.currentHole, players)"
            >
              Decrease Score
            </button>
            <div>
              <h2 class="text-5xl">{{}}</h2>
            </div>
            <div class="mt-3 text-center">Score</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
