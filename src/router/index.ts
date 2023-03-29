import { createRouter, createWebHistory } from 'vue-router'

// View Components
import TodoView from '@/views/TodoView.vue'
import BacklogView from '@/views/BacklogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'todo'
      }
    },
    {
      path: '/todo',
      name: 'todo',
      component: TodoView
    },
    {
      path: '/backlog',
      name: 'backlog',
      component: BacklogView
    }
  ]
})

export default router
