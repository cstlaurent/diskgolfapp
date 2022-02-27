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
  <h1 class="font-Oswald pt-10 text-center text-5xl font-bold">PLAYERS</h1>
  <div class="flex-col">
    <div class="mx-auto max-w-lg snap-center">
      <div
        class="m-10 mx-auto rounded-lg border-2 border-blue-400 bg-blue-100 p-4"
      >
        <input
          class="m-3"
          type="text"
          placeholder="Player Name"
          name="Addplayer"
          v-model="newPlayer"
        />
        <button
          @click="post"
          v-if="isEditMode === false"
          class="ml-24 rounded-lg bg-blue-400 py-2 px-2 font-bold text-white hover:bg-blue-600"
        >
          Add Player
        </button>
        <button
          @click="post"
          v-else
          class="mx-8 rounded-lg bg-blue-400 py-2 px-10 font-bold text-white hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>

    <table class="mx-auto mt-24 border-2 bg-blue-100">
      <tr :key="pl.id" v-for="pl in players" class="border-2 border-blue-200">
        <td>{{ pl.name }}</td>

        <td class="ml-64 flex gap-2">
          <button
            class="rounded-lg bg-blue-400 font-bold text-white hover:bg-blue-600"
            @click="deletePlayer(pl._id)"
          >
            DELETE
          </button>
          <button
            class="rounded-lg bg-blue-400 px-5 py-2 font-bold text-white hover:bg-blue-600"
            @click="editPlayer(pl._id)"
          >
            Edit
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
