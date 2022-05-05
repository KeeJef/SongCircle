import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LobbyView from '../views/LobbyView.vue'
import JoinLobbyView from '../views/JoinLobbyView.vue'

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
    component: JoinLobbyView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
