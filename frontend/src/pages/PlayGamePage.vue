<script setup>
import { ref } from 'vue'

const player1 = ref({
  score: 0,
})
</script>

<template>
  <div>
    <h2>Player 1</h2>
    <div>{{ player1.score }}</div>
    <button>Increase Score</button>
    <button>Decrease Score</button>
  </div>

  <div>
    <h2>Player 2</h2>
    <p>0</p>
    <button>Increase Score</button>
    <button>Decrease Score</button>
  </div>
</template>
