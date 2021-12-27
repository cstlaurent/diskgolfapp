<!-- -------------------------------------------------------------- -->
<!-- POURQUOI JE NAI PAS LA CLASS DU ROUTERVIEW?? -->
<script setup>
import { ref } from 'vue'
import Gamemodule from '../../components/Games.vue'
import { nanoid } from 'nanoid'

const games = ref([])
const newPlayer = ref('')
const newCourse = ref('')
const newDate = ref('')
const isEditMode = ref(false)
const editedGameid = ref('')

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
  <div
    class="
      flex
      border-4 border-blue-400
      bg-blue-100
      rounded-2xl
      p-5
      mt-12
      w-5/12
      mx-auto
    "
  >
    <form @submit.prevent="addGame">
      <div class="mt-10">
        <label for="players" class="w-20 mr-10 text-xl font-bold"
          >Players:</label
        >
        <input v-model="newPlayer" name="newPlayer" class="px-32" />
      </div>
      <br />
      <div>
        <label for="course" class="w-20 mr-10 text-xl font-bold">Course:</label>
        <input v-model="newCourse" name="newCourse" class="px-32" />
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
        class="
          bg-blue-500
          hover:bg-blue-700
          text-white
          font-bold
          py-2
          rounded-full
          ml-16
          w-52
        "
      >
        Add Game
      </button>

      <button
        v-else
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
        Save
      </button>
    </form>
  </div>

  <table class="border-2 border-blue-500 bg-blue-100 mt-24 mx-auto">
    <tr class="font-bold text-xl">
      <th>Players</th>
      <th>Course</th>
      <th>Date</th>
      <th>Id</th>

      <th></th>
    </tr>

    <tr v-for="(game, id) in games" class="border-2 border-blue-200">
      <td>{{ game.player }}</td>
      <td>{{ game.course }}</td>
      <td>{{ game.date }}</td>
      <td>{{ game.id }}</td>

      <td class="flex gap-2">
        <button
          class="
            px-3
            py-1
            bg-slate-100
            hover:bg-slate-300
            rounded-xl
            transition
          "
          @click="deleteGame(id)"
        >
          DELETE
        </button>
        <button
          class="
            px-3
            py-1
            bg-slate-100
            hover:bg-slate-300
            rounded-xl
            transition
          "
          @click="editGame(id)"
        >
          Edit
        </button>
      </td>
    </tr>
  </table>
  <Gamemodule />
  <div>{{ games }}</div>
</template>
