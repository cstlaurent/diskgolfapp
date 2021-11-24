import HomePage from './pages/Home/HomePage.vue'
import GameListPage from './pages/GameList/GameListPage.vue'
import PlayerListPage from './pages/PlayerList/PlayerListPage.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/games',
    name: 'games',
    component: GameListPage,
  },
  {
    path: '/players',
    name: 'players',
    component: PlayerListPage,
  },
]
