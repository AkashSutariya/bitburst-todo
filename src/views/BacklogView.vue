<template>
  <div class="flex flex-col justify-between h-full px-4 md:px-0">
    <div class="mt-4">
      <!-- Start: Filter & Search Backlog Section -->
      <div class="flex justify-between">
        <InputText class="w-full" placeholder="Search" v-model="state.backlogquery" />
        <Button
          class="ml-4 whitespace-nowrap"
          label="Sort by Name"
          @click="todoStore.sortBacklogsByName()"
        />
        <Button
          class="ml-4 whitespace-nowrap"
          label="Sort by Date"
          @click="todoStore.sortBacklogsByDate()"
        />
      </div>
      <!-- End: Filter & Search Backlog Section -->
      <!-- Start: Backlog List Section -->
      <ListTransition>
        <div
          class="flex mt-4 items-center justify-between"
          v-for="(backlog, index) in todoStore.backlogs"
          v-show="showBacklog(backlog)"
        >
          <TodoItem :item="backlog" @on-checked="todoStore.moveBacklogToDoneTodos(index)" />
          <Button size="small" label="Move to List" @click="todoStore.moveBacklogToTodos(index)" />
        </div>
      </ListTransition>
      <!-- End: Backlog List Section -->
    </div>
    <!-- Start: New Backlog Section -->
    <div class="flex justify-between pb-12">
      <InputText class="w-full" v-model.lazy.trim="state.backlogLabel" />
      <Button
        class="ml-4 whitespace-nowrap"
        label="Add Item"
        :disabled="!state.backlogLabel"
        @click="addBacklog()"
      />
    </div>
    <!-- End: New Backlog Section -->
  </div>
</template>
<script setup lang="ts">
// Core Vue
import { reactive } from 'vue'

// Components
import TodoItem from '@/components/ui/TodoItem.vue'
import InputText from '@/components/ui/InputText.vue'
import Button from '@/components/ui/Button.vue'
import ListTransition from '@/components/ui/ListTransition.vue'

// Types
import type { todo } from '@/types/index'

// Store
import { useTodosStore } from '@/stores/todos'
const todoStore = useTodosStore()

// State of Component
const state = reactive({
  backlogLabel: '',
  backlogquery: ''
})

// Methods
function addBacklog() {
  todoStore.addBacklog(state.backlogLabel)
  state.backlogLabel = ''
}

function showBacklog(backlog: todo) {
  const regex = new RegExp(state.backlogquery, 'i')
  if (!state.backlogquery || backlog.label.search(regex) !== -1) {
    return true
  }
  return false
}
</script>
