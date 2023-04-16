<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <!-- Start: Done Todo Section -->
      <div class="border-b border-chrome py-3 px-4 md:px-0">
        <div class="flex items-center">
          <a href="javascript:void(0)" @click="toggleDoneTodos()">
            <IconArrow class="duration-300" :class="{ 'rotate-90': state.showDoneTodos }" />
          </a>
          <span class="ml-3.5 text-light-gray text-15px"
            >{{ tasksStore.getDoneTodos.length }} Done</span
          >
        </div>
        <ListTransition v-show="state.showDoneTodos">
          <TodoItem
            class="mt-3"
            v-for="todo in tasksStore.getDoneTodos"
            :item="todo"
            @on-task-undone="tasksStore.markTaskAsUndoneById(todo.id)"
          />
        </ListTransition>
      </div>
      <!-- End: Done Todo Section -->
      <!-- Start: Todo Section -->
      <ListTransition class="px-4 md:px-0">
        <div
          class="flex mt-3 items-center justify-between"
          v-for="todo in tasksStore.getTodos"
          :key="todo.id"
        >
          <TodoItem
            :item="todo"
            @on-task-done="tasksStore.markTaskAsDoneById(todo.id)"
          />
          <!-- Start: Todo Action Section -->
          <div class="relative">
            <a
              href="javascript:void(0)"
              class="h-10 w-10 rounded-full flex items-center justify-center hover:bg-chrome"
              :class="{ 'bg-chrome': todo.id === state.todoEllipsisMenuId }"
              v-click-outside="handleEllipsisMenuClickOutside"
              @click.stop="setTodoEllipsisMenuId(todo.id)"
            >
            <IconEllipsis
              :class="[todo.id === state.todoEllipsisMenuId ? 'fill-black' : 'fill-dark-gray']"
            />
            </a>
            <div
              v-show="todo.id === state.todoEllipsisMenuId"
              class="absolute top-0 right-10 z-10 pr-1"
            >
              <Button
                class="w-full text-left rounded-b-none -ml-px -mt-px"
                size="small"
                label="Delete"
                @click="tasksStore.deleteTaskById(todo.id)"
              />
              <Button
                class="w-full text-left rounded-t-none -ml-px -mt-px"
                size="small"
                label="Move to Backlog"
                @click="tasksStore.setTaskAsBacklogById(todo.id)"
              />
            </div>
          </div>
          <!-- End: Todo Action Section -->
        </div>
      </ListTransition>
      <!-- End: Todo Section -->
    </div>
    <!-- Start: New Todo Section -->
    <div class="flex justify-between pb-12 px-4 md:px-0">
      <InputText class="w-full" v-model.lazy.trim="state.newTodo.label" />
      <Button
        class="ml-4"
        label="Add Item"
        :disabled="!state.newTodo.label"
        @click="addTodo()"
      />
    </div>
    <!-- End: New Todo Section -->
  </div>
</template>
<script setup lang="ts">
// Core VUe
import { reactive } from 'vue'

// Components
import TodoItem from '@/components/TodoItem.vue'
import InputText from '@/components/ui/inputs/InputText.vue'
import Button from '@/components/ui/actions/Button.vue'
import ListTransition from '@/components/ui/transitions/ListTransition.vue'

// Icons
import IconArrow from '@/components/icons/IconArrow.vue'
import IconEllipsis from '@/components/icons/IconEllipsis.vue'

import type { task, taskInput } from '@/types/index'

import { TASKTYPE } from '@/constants/index'

// Store
import { useTasksStore } from '@/stores/tasks'
const tasksStore = useTasksStore()

// State of Component
const state = reactive({
  todoEllipsisMenuId: 0,
  newTodo: {
    label: '',
    type: TASKTYPE.TODO,
  } as taskInput,
  showDoneTodos: false
})

// Methods
function setTodoEllipsisMenuId(id: number) {
  state.todoEllipsisMenuId = id;
}

function handleEllipsisMenuClickOutside() {
  state.todoEllipsisMenuId = 0;
}

function addTodo() {
  tasksStore.addTask(state.newTodo as task);
  resetNewTodo();
}

function resetNewTodo() {
  state.newTodo = {
    label: '',
    type: TASKTYPE.TODO
  };
}

function toggleDoneTodos() {
  state.showDoneTodos = !state.showDoneTodos
}
</script>
