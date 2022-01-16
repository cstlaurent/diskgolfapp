<script setup>
import { ref, onMounted } from 'vue'
import { nanoid } from 'nanoid'
import Gamemodule from '../../components/Games.vue'
import dropdownPlayer from '../../components/DropDown.vue'
import dropdownCourse from '../../components/DropDownCourse.vue'
import { getPlayerList } from '../../api/players'
import { getCourseList } from '../../api/courses'

const games = ref([])
const newPlayer = ref('')
const newCourse = ref('')
const newDate = ref('')
const isEditMode = ref(false)
const editedGameid = ref('')
const players = ref([])
const courses = ref([])
const selectedPlayers = ref([])
const selectedCourse = ref([])

onMounted(async () => {
  players.value = await getPlayerList()
  courses.value = await getCourseList()
})
function playerSelected(player) {
  selectedPlayers.value.push(player)
}
function deleteSelectedPlayer(id) {
  selectedPlayers.value.splice(id, 1)
}

function addGame() {
  if (isEditMode.value === false) {
    games.value.push({
      id: nanoid(),
      player: newPlayer.value,
      course: newCourse.value,
      date: newDate.value,
    })
  } else {
    const g = games.value[editedGameid.value]

    const newGame = {
      id: g.id,
      player: newPlayer.value,
      course: newCourse.value,
      date: newDate.value,
    }
    games.value.splice(editedGameid.value, 1, newGame)
    isEditMode.value = false
  }

  newPlayer.value = ''
  newCourse.value = ''
  newDate.value = ''
}

function deleteGame(id) {
  games.value.splice(id, 1)
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
  <div>{{ selectedCourse }}</div>
  <table class="border-2 border-blue-500 bg-blue-100 mt-24 mx-auto w-4/12">
    <tr class="font-bold text-xl">
      <th>Players</th>
      <th></th>
    </tr>

    <tr
      v-for="(player, id) in selectedPlayers"
      class="border-2 border-blue-200"
    >
      <td>{{ player.name }}</td>

      <td class="flex gap-1">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="deleteSelectedPlayer(id)"
        >
          DELETE
        </button>
      </td>
    </tr>
  </table>

  <div
    class="flex border-4 border-blue-400 bg-blue-100 rounded-2xl p-5 mt-24 w-5/12 mx-auto"
  >
    <form @submit.prevent="addGame">
      <div class="mt-10">
        <label for="players" class="w-20 mr-10 text-xl font-bold"
          >Players:</label
        >
        <dropdownPlayer @playerSelected="playerSelected" :players="players" />
      </div>
      <br />
      <div>
        <label for="course" class="w-20 mr-10 text-xl font-bold">Course:</label>
        <dropdownCourse @courseSelected="courseSelected" :courses="courses" />
      </div>
      <br />
      <label for="date" class="w-20 mr-10 text-xl font-bold">Date:</label>
      <input
        v-model="newDate"
        type="date"
        class="text-xl border-2 border-blue-400 mx-10 rounded-lg"
      />

      <button
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
      </button>
    </form>
  </div>

  <!-- <table class="border-2 border-blue-500 bg-blue-100 mt-24 mx-auto w-5/12">
    <tr class="font-bold text-xl">
      <th>Players</th>
      <th>Course</th>
      <th>Date</th>

      <th></th>
    </tr>

    <tr v-for="(game, id) in games" class="border-2 border-blue-200">
      <td>{{ game.player }}</td>
      <td>{{ game.course }}</td>
      <td>{{ game.date }}</td>

      <td class="flex gap-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="deleteGame(id)"
        >
          DELETE
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="editGame(id)"
        >
          Edit
        </button>
      </td>
    </tr>
  </table> -->
  <Gamemodule />
  <div>{{ games }}</div>
</template>
