<script setup>
import { ref, onMounted } from 'vue'
import { nanoid } from 'nanoid'
import Gamemodule from '../../components/Games.vue'
import dropdownPlayer from '../../components/DropDown.vue'
import dropdownCourse from '../../components/DropDownCourse.vue'
import { getPlayerList } from '../../api/players'
import { getCourseList } from '../../api/courses'
import { getGameList } from '../../api/games'

const games = ref([])
const savedGames = ref([])
const newPlayer = ref('')
const newCourse = ref('')
const newDate = ref('')
const isEditMode = ref(false)
const editedGameid = ref('')
const players = ref([])
const courses = ref([])
const selectedPlayers = ref([])
const selectedCourse = ref([])
const date = ref(currentDate())

function currentDate() {
  const current = new Date()
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`
  return date
}
onMounted(async () => {
  players.value = await getPlayerList()
  courses.value = await getCourseList()
  savedGames.value = await getGameList()
})
function playerSelected(player) {
  selectedPlayers.value.push(player)
}
function courseSelected(course) {
  selectedCourse.value.splice(0, 1, course)
}
function deleteSelectedPlayer(player) {
  selectedPlayers.value.splice(player.id, 1)
  //push le players dans les choix pour ne pas qu'il disparaisse
  players.value.push(player)
}

// le add game sera le boutton pour start une game
async function addGame() {
  games.value.push({
    id: nanoid(),
    player: selectedPlayers.value,
    course: selectedCourse.value,
    date: date.value,
  })
  postGame()
  players.value = await getPlayerList()
}

async function postGame() {
  const newGame = {
    players: selectedPlayers.value,
    course: selectedCourse.value,
    date: date.value,
  }
  const body = JSON.stringify(newGame)
  const gamesResponse = await fetch('http://127.0.0.1:7778/game', {
    body: body,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  savedGames.value = await getGameList()
  selectedPlayers.value = []
}

async function deleteGame(idToDel) {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${idToDel}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  savedGames.value = await getGameList()
}

function editGame(id) {
  const gameToEdit = games.value[id]
  isEditMode.value = true
  newPlayer.value = gameToEdit.player
  newCourse.value = gameToEdit.course
  newDate.value = gameToEdit.date
  editedGameid.value = id
}
</script>

<template>
  <div
    class="flex border-4 border-blue-400 bg-blue-100 rounded-2xl p-5 mt-24 w-5/12 mx-auto"
  >
    <form @submit.prevent="addGame">
      <div class="mt-10 z-20">
        <label for="players" class="w-20 mr-10 text-xl font-bold"
          >Players:</label
        >
        <dropdownPlayer @playerSelected="playerSelected" :players="players" />
      </div>
      <br />
      <div class="z-10">
        <label for="course" class="w-20 mr-10 text-xl font-bold">Course:</label>
        <dropdownCourse @courseSelected="courseSelected" :courses="courses" />
      </div>
      <br />
      <!-- <label for="date" class="w-20 mr-10 text-xl font-bold">Date:</label>
      <input
        v-model="newDate"
        type="date"
        class="text-xl border-2 border-blue-400 mx-10 rounded-lg"
      /> -->

      <!-- <button
        v-if="isEditMode === false"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-full ml-16 w-52"
      >
        Add Game
      </button>

      <button
        v-else
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full ml-60 mb-5"
      >
        Save
      </button> -->
      <table class="bg-blue-200 mt-24 mx-auto">
        <tr class="font-bold text-xl border-2 border-blue-500">
          <th>Players</th>
          <th v-for="course in selectedCourse">{{ course.name }}</th>
          <th>{{ date }}</th>
        </tr>

        <tr
          v-for="(player, id) in selectedPlayers"
          class="border-2 border-blue-200"
        >
          <td>{{ player.name }}</td>

          <td class="flex">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20 m-3"
              @click="deleteSelectedPlayer(player)"
            >
              DELETE
            </button>
          </td>
        </tr>
      </table>
    </form>
    <button
      @click="addGame"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20 h-20 m-3"
    >
      CREATE GAME
    </button>
  </div>

  <table class="border-2 border-blue-500 bg-blue-100 mt-24 mx-auto w-5/12">
    <tr class="font-bold text-xl">
      <th>Players</th>
      <th>Course</th>
      <th>Date</th>

      <th></th>
    </tr>

    <tr v-for="(game, id) in savedGames" class="border-2 border-blue-200">
      <td v-for="player in game.players">{{ player.name }}</td>
      <td v-for="course in game.course">{{ course.name }}</td>
      <td>{{ date }}</td>

      <td class="flex gap-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="deleteGame(id)"
        >
          DELETE
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
        >
          PLAY
        </button>
      </td>
    </tr>
  </table>
  <div>PLAYERS{{ players }}</div>
  <br />
  <br />
  <div>selected players {{ selectedPlayers }}</div>
  <Gamemodule />
</template>
