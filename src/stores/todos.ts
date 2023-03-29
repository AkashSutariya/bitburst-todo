// stores/todos.ts
import { defineStore } from 'pinia'
import type { todo } from '@/types/index'

export const useTodosStore = defineStore('todos', {
  state: () => {
    return {
      todos: [] as todo[],
      backlogs: [] as todo[],
      doneTodos: [] as todo[]
    }
  },
  actions: {
    addTodo(label: string) {
      const creationTime = new Date()
      this.todos.push({
        label: label,
        formattedTime: creationTime.toLocaleString(),
        timestamp: creationTime.getTime()
      })
    },
    deleteTodo(index: number) {
      this.todos.splice(index, 1)
    },
    moveTodoToBacklogs(index: number) {
      this.backlogs.push(this.todos.splice(index, 1)[0])
    },
    moveTodoToDoneTodos(index: number) {
      this.doneTodos.push(this.todos.splice(index, 1)[0])
    },
    moveDoneTodoToTodos(index: number) {
      this.todos.push(this.doneTodos.splice(index, 1)[0])
    },
    addBacklog(label: string) {
      const creationTime = new Date()
      this.backlogs.push({
        label: label,
        formattedTime: creationTime.toLocaleString(),
        timestamp: creationTime.getTime()
      })
    },
    sortBacklogsByName() {
      this.backlogs.sort((a, b) => {
        const aname = a.label.toLocaleLowerCase()
        const bname = b.label.toLocaleLowerCase()

        if (aname < bname) {
          return -1
        }
        if (aname > bname) {
          return 1
        }
        return 0
      })
    },
    sortBacklogsByDate() {
      this.backlogs.sort((a, b): number => {
        return a.timestamp - b.timestamp
      })
    },
    moveBacklogToTodos(index: number) {
      this.todos.push(this.backlogs.splice(index, 1)[0])
    },
    moveBacklogToDoneTodos(index: number) {
      this.doneTodos.push(this.backlogs.splice(index, 1)[0])
    }
  }
})
