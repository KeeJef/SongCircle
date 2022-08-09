import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LobbyView from '../views/LobbyView.vue'
import JoinLobbyView from '../views/JoinLobbyView.vue'
import JoinView from '../views/JoinView.vue'
import SearchView from '../views/SearchView.vue'
import VoteView from '../views/VoteView.vue'
import EndRound from '../views/EndRound.vue'
import nextGame from '../views/NextGame.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/lobby',
    name: 'lobby',
    component: LobbyView
  },
  {
    path: '/join',
    name: 'join',
    component: JoinView
  },
  {
    path: '/joinLobby',
    name: 'joinLobby',
    component: JoinLobbyView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/vote',
    name: 'vote',
    component: VoteView
  },
  {
    path: '/endRound',
    name: 'endRound',
    component: EndRound
  },
  {
    path: '/nextGame',
    name: 'nextGame',
    component: nextGame
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
