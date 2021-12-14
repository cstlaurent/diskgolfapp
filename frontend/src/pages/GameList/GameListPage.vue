<!-- -------------------------------------------------------------- -->
<!-- POURQUOI JE NAI PAS LA CLASS DU ROUTERVIEW?? -->
<script setup>
import { ref } from 'vue'
import Gamemodule from '../../components/Games.vue'
let gamecount = 0
const games = ref([])
const newPlayer = ref('')
const newCourse = ref('')
const newDate = ref('')
function addGame() {
  games.value.push({
    id: 'Game ' + gamecount++,
    player: newPlayer.value,
    course: newCourse.value,
    date: newDate.value,
  })
}
</script>

<template>
  <Gamemodule />
  <div>{{ games }}</div>

  <div class="border-2 border-blue-500 shadow-md rounded-3xl p-5 mt-56">
    <form @submit.prevent="addGame">
      <div class="mt-10 border-2">
        <label for="players" class="w-20 bg-violet-400 mr-10 mt-32"
          >Players:</label
        >
        <input v-model="newPlayer" name="newPlayer" class="bg-blue-100 px-60" />
      </div>
      <br />
      <div>
        <label for="course" class="w-20 bg-violet-400 mr-10">Course:</label>
        <input v-model="newCourse" name="newCourse" class="bg-blue-100 px-60" />
      </div>
      <br />
      <label for="date" class="w-20 bg-violet-400 mr-10">Date:</label>
      <input
        v-model="newDate"
        type="date"
        class="border-2 border-blue-200 mx-10"
      />

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
          mb-5
        "
      >
        Add Game
      </button>
    </form>
  </div>

  <div>
    <table class="border-2 border-blue-500 bg-blue-100 w-full ">
      <tr class="border-2 border-black ">
        <td class="">Players</td>
        <td class="">Course</td>
        <td class="">date</td>
        <td class="">edit/del ??</td>
      </tr>

        <div  v-for="game in games" :key="game.id">
      <tr class="border-2 border-black ">
          <tr>
            <td class="">{{ game.player }}</td>
            <td class="">{{ game.course }}</td>
            <td class="">{{ game.date }}</td>
            <td class="">edit/del ??</td>
          </tr>
      </tr>
        </div>
    </table>
  </div>
</template>
