<script setup></script>

<template>
  <div class="w-screen bg-gray-200 flex flex-row p-3 my-5">
    <div class="mx-auto w-2/3">
      <!-- Profile Card -->
      <div
        class="rounded-lg shadow-lg bg-gray-600 w-full flex flex-row flex-wrap p-3 antialiased"
        style="
          background-image: url('https://i.redd.it/mqvsmm8595cz.jpg');
          background-size: cover;
          background-blend-mode: multiply;
        "
      >
        <div
          v-if="currentHole === 1"
          class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10"
        >
          <div>
            {{ game?.course?.name || '' }} {{ game.date }}

            <p>hole 1</p>
          </div>

          <div
            v-for="players in game.players"
            class="basis-1/4 border-2 border-white rounded-lg"
          >
            <!-- /////PLAYER 1------------------------ -->
            <!-- vfor -->

            <!-- <h2>{{ playing?.player1?.name || '' }}</h2> -->
            <h2>{{ players.name }}</h2>

            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h1++"
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click="players.score.h1--"
            >
              Decrease Score
            </button>
            <div>
              <p>{{}}</p>
              <h2 class="text-5xl">{{}}</h2>
            </div>
            <div>{{ players.score.h1 }}</div>
          </div>
        </div>
        <!-- ----------------------------------------h2 -->
      </div>
    </div>
  </div>
</template>
