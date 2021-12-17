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
const lignCount=0

function addGame() {

  games.value.push({
    id: gamecount++,
    player: newPlayer.value,
    course: newCourse.value,
    date: newDate.value,
})

}

function deleteGame(id){
  games.value.splice(id,1)
gamecount--

  }

  





</script>

<template>
  <Gamemodule />
  <div>{{ games }}</div>
 
 <!-- =======================================================
 BUTTON TEST POUR DELETE -->
 
 <!-- <div>
<button class="bg-red-400 rounded-md" @click="deleteGame"> DELETE TEST</button>

  </div> -->
<!-- ========================================================== -->
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

  <div class="mt-28 ml- ml-32 ">
    <table class="border-2 border-blue-500 bg-blue-100     ">
      <tr class=" font-bold text-xl  ">
      
       <td class="inline-block  text-center w-52 ">Players</td>
        <td class="inline-block  text-center w-52 ">Course</td>
        <td class="inline-block  text-center w-52  ">Date</td>
        <td class="inline-block  text-center w-52  ">Id</td>

        <td class="inline-block  text-center w-52"></td>
      </tr>

        <div  v-for="game in games" >
      <tr class="border-2 border-blue-200">
          <tr>
            
            <td class="inline-block w-52 text-center">{{ game.player }}</td>
            <td class="inline-block w-52 text-center">{{ game.course }}</td>
            <td class="inline-block w-52 text-center">{{ game.date }}</td>
            <td class="inline-block w-52 text-center">{{ game.id }}</td>
            
            <td class="inline-block w-52 text-center"> <button @click="deleteGame(game.id)">DELETE</button></td>
          
          </tr>
      </tr>
        </div>
    </table>
    
  </div>

</template>
