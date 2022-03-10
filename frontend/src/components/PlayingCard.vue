<script setup>
import PlayingCardPlayer from './PlayingCardPlayer.vue'
const props = defineProps({
  game: Object,
  currentHole: Number,
  hHole: String,
})
</script>

<template>
  <div class="my-5 flex w-screen flex-row bg-gray-200 p-3">
    <div class="mx-auto w-2/3">
      <!-- Profile Card -->
      <div
        class="flex w-full flex-row flex-wrap rounded-lg bg-gray-600 p-3 antialiased shadow-lg"
        style="
          background-image: url('https://i.redd.it/mqvsmm8595cz.jpg');
          background-size: cover;
          background-blend-mode: multiply;
        "
      >
        <div class="ml-10 flex h-60 flex-row gap-10 text-white">
          <div class="text-xl font-bold">
            {{ props.game?.course?.name || '' }} {{ props?.game?.date }}
            <p class="mt-10">hole</p>
            <p class="text-7xl">{{ props.currentHole }}</p>
          </div>

          <div class="flex">
            <PlayingCardPlayer
              v-if="props.game"
              :key="player.id"
              v-for="player in props?.game?.players"
              :player="player"
              :hole="currentHole"
              :gameId="props.game._id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
