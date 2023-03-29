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
            >{{ todoStore.doneTodos.length }} Done</span
          >
        </div>
        <ListTransition v-show="state.showDoneTodos">
          <TodoItem
            class="mt-3"
            v-for="(todo, index) in todoStore.doneTodos"
            :item="todo"
            checked
            @on-unchecked="todoStore.moveDoneTodoToTodos(index)"
          />
        </ListTransition>
      </div>
      <!-- End: Done Todo Section -->
      <!-- Start: Todo Section -->
      <ListTransition class="px-4 md:px-0">
        <div
          class="flex mt-3 items-center justify-between"
          v-for="(todo, index) in todoStore.todos"
          :key="todo.timestamp"
        >
          <TodoItem
            :item="todo"
            @on-checked="todoStore.moveTodoToDoneTodos(index)"
            @on-remove="handleEllipsisMenuClickOutside"
          />
          <!-- Start: Todo Action Section -->
          <a
            href="javascript:void(0)"
            class="relative h-10 w-10 rounded-full flex items-center justify-center hover:bg-chrome"
            :class="[index === state.todoEllipsisMenuIndex ? 'bg-chrome' : '']"
            v-click-outside="handleEllipsisMenuClickOutside"
            @click.stop="setTodoEllipsisMenuIndex(index)"
          >
            <IconEllipsis
              :class="[index === state.todoEllipsisMenuIndex ? 'fill-black' : 'fill-dark-gray']"
            />
            <div
              v-show="index === state.todoEllipsisMenuIndex"
              class="absolute top-0 right-10 z-10 pr-1"
            >
              <Button
                class="w-full text-left"
                size="small"
                label="Delete"
                @click.stop="todoStore.deleteTodo(index)"
              />
              <Button
                class="w-full text-left"
                size="small"
                label="Move to Backlog"
                @click.stop="todoStore.moveTodoToBacklogs(index)"
              />
            </div>
          </a>
          <!-- End: Todo Action Section -->
        </div>
      </ListTransition>
      <!-- End: Todo Section -->
    </div>
    <!-- Start: New Todo Section -->
    <div class="flex justify-between pb-12 px-4 md:px-0">
      <InputText class="w-full" v-model.lazy.trim="state.todoLabel" />
      <Button
        class="ml-4 whitespace-nowrap"
        label="Add Item"
        :disabled="!state.todoLabel"
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
import TodoItem from '@/components/ui/TodoItem.vue'
import InputText from '@/components/ui/InputText.vue'
import Button from '@/components/ui/Button.vue'
import ListTransition from '@/components/ui/ListTransition.vue'

// Icons
import IconArrow from '@/components/icons/IconArrow.vue'
import IconEllipsis from '@/components/icons/IconEllipsis.vue'

// Store
import { useTodosStore } from '@/stores/todos'
const todoStore = useTodosStore()

// State of Component
const state = reactive({
  todoEllipsisMenuIndex: -1,
  todoLabel: '',
  showDoneTodos: false
})

// Methods
function setTodoEllipsisMenuIndex(index: number) {
  state.todoEllipsisMenuIndex = index
}

function handleEllipsisMenuClickOutside() {
  state.todoEllipsisMenuIndex = -1
}

function addTodo() {
  todoStore.addTodo(state.todoLabel)
  state.todoLabel = ''
}

function toggleDoneTodos() {
  state.showDoneTodos = !state.showDoneTodos
}
</script>
