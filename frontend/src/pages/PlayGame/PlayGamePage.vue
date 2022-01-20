<script setup>
import { ref, reactive } from 'vue'

//temporaire
const player1 = reactive({
  score: 3,
})

const player2 = reactive({
  score: 3,
})
const player3 = reactive({
  score: 3,
})
const player4 = reactive({
  score: 3,
})

function increaseScore(playerId) {}
</script>

<template>
  <div class="w-screen h-screen bg-white flex flex-row p-3 mt-32">
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
          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 1</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 2</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 3</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 4</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- End Profile Card -->
    </div>
  </div>
</template>
