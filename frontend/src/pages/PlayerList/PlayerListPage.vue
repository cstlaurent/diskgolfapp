<script setup>
import { onMounted, ref } from 'vue'
import * as playerApi from '../../api/players'
const players = ref([])
const newPlayer = ref('')
const isEditMode = ref(false)

onMounted(async () => {
  players.value = await playerApi.getPlayerList()
})

async function post() {
  if (isEditMode.value === false) {
    const newP = {
      name: newPlayer.value,
    }
    const body = JSON.stringify(newP)
    const playersResponse = await fetch('http://127.0.0.1:7778/player', {
      body: body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (playersResponse.status === 400) {
      alert('Please enter a player name')
    }
  } else {
    //  EDIT MODE RECOIT ID TO EDIT DE LA FUNCTION EDITPLAYER

    const modifiedPlayer = {
      name: newPlayer.value,
    }
    const body = JSON.stringify(modifiedPlayer)
    const playersResponse = await fetch(
      `http://127.0.0.1:7778/player/${isEditMode.value}`,
      {
        body: body,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
  players.value = await playerApi.getPlayerList()
  isEditMode.value = false
  newPlayer.value = ''
}
async function editPlayer(idToEdit) {
  isEditMode.value = idToEdit
  // verifier ID pour chaque players
  for (const PLA of players.value) {
    if (PLA.id === idToEdit) {
      newPlayer.value = PLA.name
    }
  }
}

async function deletePlayer(idToDel) {
  await playerApi.deletePlayer(idToDel)
  players.value = await playerApi.getPlayerList()
}
</script>

<template>
  <div class="text-4xl font-bold text-center bg-blue-200 mt-10 mb-48">
    PLAYERS
  </div>

  <div class="my-40 bg-yellow-100">
    <div>
      <input
        name="Addplayer"
        class="bg-violet-200 mx-20 w-1/2"
        v-model="newPlayer"
      />
      <button
        @click="post"
        v-if="isEditMode === false"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 rounded-full w-52"
      >
        Add Player
      </button>
      <button
        @click="post"
        v-else
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-full ml-60 mb-5"
      >
        Save
      </button>
    </div>
  </div>

  <table class="border-2 border-blue-500 bg-blue-100 mt-24 mx-auto w-5/12">
    <tr class="font-bold text-xl">
      <th>Players</th>
      <th></th>
    </tr>

    <tr :key="pl.id" v-for="pl in players" class="border-2 border-blue-200">
      <td>{{ pl.name }}</td>

      <td class="flex gap-2 ml-64">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="deletePlayer(pl.id)"
        >
          DELETE
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full w-20"
          @click="editPlayer(pl.id)"
        >
          Edit
        </button>
      </td>
    </tr>
  </table>

  <div class="text-xl font-bold text-blue-500 ml-6" v-for="pl in players">
    {{ pl.name }}
  </div>

  <div>{{ players }}</div>
</template>
