<script>
import { ref } from 'vue'
export default {
  setup() {
    const games = ref([])
    const newGame = ref('')
    function addGame() {
      console.log(newGame.value)
      games.value.push({
        id: Date.now(),
        done: false,
        content: newGame.value,
      })
    }
    return {
      addGame,
      newGame,
      games,
    }
  },
}
</script>

<template>
  <div class="font-bold text-5xl">
    <p class="align-middle inline-block">Game list</p>
  </div>

  <div class="m-3">
    <h1>Test Game</h1>
    <ul>
      <li>un</li>
      <li>deux</li>
      <li>trois</li>
    </ul>
  </div>
  <br />
  <br />
  <br />
  <div class="flex border-2 border-blue-500 border-opacity-50 p-5 m-5">
    <form @submit.prevent="addGame">
      <div>
        <label for="players" class="w-20 bg-violet-400 mr-10">Players:</label>
        <input v-model="newGame" name="newGame" class="bg-blue-100 px-60" />
      </div>
      <br />
      <div>
        <label for="course" class="w-20 bg-violet-400 mr-10">Course:</label>
        <input class="bg-blue-100 px-60" />
      </div>
      <br />
      <label for="date" class="w-20 bg-violet-400 mr-10">Date:</label>
      <input class="bg-blue-100 px-60" />

      <br />
      <br />
      <br />
      <button
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          px-20
          rounded-full
          ml-60
        "
      >
        Add Game
      </button>
    </form>
  </div>
  <ul class="list-disc">
    <li v-for="game in games" :key="game.id">
      <h3>{{ game.content }}</h3>
    </li>
  </ul>
</template>
