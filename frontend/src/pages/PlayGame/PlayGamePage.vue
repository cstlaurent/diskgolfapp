<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const route = useRoute()
const game = ref({})
const gameId = route.params.id

async function getGameToPlay() {
  const gamesResponse = await fetch(`http://127.0.0.1:7778/game/${gameId}`)
  console.log('game', gamesResponse)
  const gameToPlay = await gamesResponse.json()
  return gameToPlay
}

onMounted(async () => {
  game.value = await getGameToPlay()
})

let categories = ref({
  'Hole 1': [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  'Hole 2': [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  'Hole 3': [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
  'Hole 4': [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})

//temporaire
const player1 = reactive({
  score: 3,
})

const player2 = reactive({
  score: 3,
})
const player3 = reactive({
  score: 3,
})
const player4 = reactive({
  score: 3,
})

function increaseScore(playerId) {}
</script>

<template>
  <div class="w-screen h-screen bg-white flex flex-row p-3 mt-32">
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
        <div class="text-white ml-10 flex flex-row grid-cols-4 h-60 gap-10">
          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 1</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 2</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 3</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>

          <div class="basis-1/4 border-2 border-white rounded-lg">
            <h2>Player 4</h2>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Increase Score
            </button>
            <button
              class="bg-gray-500 rounded-t-lg hover:bg-gray-800"
              @click=""
            >
              Decrease Score
            </button>
            <div>
              <p>score:</p>
              <h2 class="text-5xl">{{ player1.score }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>{{ game }}</div>

  <div class="w-full max-w-md px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
              'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
              selected
                ? 'bg-white shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx"
          :class="[
            'bg-white rounded-xl p-3',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
          ]"
        >
          <ul>
            <li
              v-for="post in posts"
              key="post.id"
              class="relative p-3 rounded-md hover:bg-coolGray-100"
            >
              <h3 class="text-sm font-medium leading-5">
                {{ post.title }}
              </h3>

              <ul
                class="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500"
              >
                <li>{{ post.date }}</li>
                <li>&middot;</li>
                <li>{{ post.commentCount }} comments</li>
                <li>&middot;</li>
                <li>{{ post.shareCount }} shares</li>
              </ul>

              <a
                href="#"
                :class="[
                  'absolute inset-0 rounded-md',
                  'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400',
                ]"
              />
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
