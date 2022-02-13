<script setup>
import { ref, onMounted } from 'vue'
import { nanoid } from 'nanoid'
import Gamemodule from '../../components/Games.vue'
import dropdownPlayer from '../../components/DropDown.vue'
import dropdownCourse from '../../components/DropDownCourse.vue'
import * as apiPlayers from '../../api/players'
import * as apiCourses from '../../api/courses'
import * as apiGames from '../../api/games'

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
const selectedCourse = ref(null)
const date = ref(currentDate())

function currentDate() {
  const current = new Date()
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`
  return date
}
onMounted(async () => {
  players.value = await apiPlayers.getPlayerList()
  courses.value = await apiCourses.getCourseList()
  savedGames.value = await apiGames.getGameList()
})
function playerSelected(player) {
  selectedPlayers.value.push(player)
}
function courseSelected(course) {
  selectedCourse.value = course
}
async function deleteSelectedPlayer(player) {
  selectedPlayers.value.splice(player.id, 1)
  //push le players dans les choix pour ne pas qu'il disparaisse
  players.value.push(player)
  players.value = await apiPlayers.getPlayerList()
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
  players.value = await apiPlayers.getPlayerList()
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
  savedGames.value = await apiGames.getGameList()
  selectedPlayers.value = []
}

async function deleteGame(idToDel) {
  await apiGames.deleteGame(idToDel)

  savedGames.value = await apiGames.getGameList()
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
    class="mx-auto mt-24 max-w-md flex-col rounded-2xl border-4 border-blue-400 bg-blue-100 p-5"
  >
    <form class="flex-1" @submit.prevent="addGame">
      <div class="z-20 mt-10 flex-1">
        <label for="players" class="mr-10 w-20 text-xl font-bold"
          >Players:</label
        >
        <dropdownPlayer @playerSelected="playerSelected" :players="players" />
      </div>
      <br />
      <div class="z-10">
        <label for="course" class="mr-10 w-20 text-xl font-bold">Course:</label>
        <dropdownCourse @courseSelected="courseSelected" :courses="courses" />
      </div>
      <br />
    </form>
    <table class="mx-auto mt-24 bg-blue-200">
      <tr class="border-2 border-blue-500 text-xl font-bold">
        <th>Players</th>
        <th v-if="selectedCourse">{{ selectedCourse.name }}</th>
        <th>{{ date }}</th>
      </tr>

      <tr
        v-for="(player, id) in selectedPlayers"
        class="border-2 border-blue-200"
      >
        <td>{{ player.name }}</td>

        <td class="flex">
          <button
            @click="deleteSelectedPlayer"
            class="m-3 w-20 rounded-full bg-blue-500 font-bold text-white hover:bg-blue-700"
          >
            DELETE
          </button>
        </td>
      </tr>
    </table>
    <button
      @click="addGame"
      class="m-3 h-20 w-20 rounded-full bg-blue-500 font-bold text-white hover:bg-blue-700"
    >
      CREATE GAME
    </button>
  </div>

  <table class="mx-auto mt-24 w-5/12 border-2 border-blue-500 bg-blue-100">
    <tr class="text-xl font-bold">
      <th>Players</th>
      <th>Course</th>
      <th>Date</th>

      <th></th>
    </tr>

    <tr v-for="(game, id) in savedGames" class="border-2 border-blue-200">
      <td v-for="player in game.players">{{ player.name }}</td>
      <td v-if="game.course">{{ game.course.name }}</td>
      <td>{{ date }}</td>

      <td class="flex gap-2">
        <button
          class="w-20 rounded-full bg-blue-500 font-bold text-white hover:bg-blue-700"
          @click="deleteGame(id)"
        >
          DELETE
        </button>
        <div>
          <router-link
            :to="`/PlayGame/${game.id}`"
            class="w-20 rounded-full bg-blue-500 font-bold text-white hover:bg-blue-700"
            >playgame</router-link
          >
        </div>
      </td>
    </tr>
  </table>

  <div>{{ savedGames }}</div>

  <Gamemodule />
</template>
