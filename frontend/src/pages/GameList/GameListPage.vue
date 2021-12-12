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
  <div>Game List Page</div>

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
  <form @submit.prevent="addGame">
    <div>
      <label for="players">players:</label>
      <input
        v-model="newGame"
        name="newGame"
        class="bg-blue-100 px-60 align-middle"
      />
    </div>
    <br />
    <div>
      <label for="course">course:</label>
      <input class="bg-blue-100 px-60 align-middle" />
    </div>
    <br />
    <label for="date">date:</label>
    <input class="bg-blue-100 px-60 align-middle" />

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
  <ul class="list-disc">
    <li v-for="game in games" :key="game.id">
      <h3>{{ game.content }}</h3>
    </li>
  </ul>
</template>
