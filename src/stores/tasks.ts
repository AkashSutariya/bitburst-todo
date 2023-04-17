import { defineStore } from 'pinia'

// Types
import type { task } from '@/types/index'

// Constants
import { TASKTYPE } from '@/constants/index'

export const useTasksStore = defineStore('tasks', {
  state: () => {
    return {
      tasks: [] as task[],
      taskAutoId: 0,
    }
  },
  getters: {
    getTodos(): task[] {
      return this.tasks.filter((task) => !task.isDone && task.type === TASKTYPE.TODO);
    },
    getDoneTodos(): task[] {
      return this.tasks.filter((task) => task.isDone && task.type === TASKTYPE.TODO);
    },
    getBacklogs(): task[] {
      return this.tasks.filter((task) => task.type === TASKTYPE.BACKLOG);
    },
    getTaskById: function() {
      return (id: number) => this.tasks.find((task) => task.id === id);
    },
  },
  actions: {
    addTask(payload: task) {
      const {
        id = ++this.taskAutoId,
        label,
        type,
        isDone = false,
        createdAt = new Date(),
      } = payload;
      this.tasks.push({
        id,
        label,
        type,
        isDone,
        createdAt,
      });
    },
    deleteTaskById(id: number) {
      const index = this.tasks.findIndex((task) => {
        return task.id == id
      });
      this.tasks.splice(index, 1);
    },
    markTaskAsDoneById(id: number) {
      const task = this.getTaskById(id);
      if (task) {
        task.isDone = true;
        task.type = TASKTYPE.TODO;
      }
    },
    markTaskAsUndoneById(id: number) {
      const task = this.getTaskById(id);
      if (task) {
        task.isDone = false;
      }
    },
    setTaskAsBacklogById(id: number) {
      const task = this.getTaskById(id);
      if (task) {
        task.type = TASKTYPE.BACKLOG;
      }
    },
    setTaskAsTodoById(id: number) {
      const task = this.getTaskById(id);
      if (task) {
        task.type = TASKTYPE.TODO;
      }
    },
  }
})
