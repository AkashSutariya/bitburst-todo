<template>
  <div class="flex flex-col justify-between h-full px-4 md:px-0">
    <div class="mt-4">
      <!-- Start: Filter & Search Backlog Section -->
      <div class="flex justify-between gap-4">
        <InputText class="w-full" placeholder="Search" v-model="state.labelQ" />
        <Button
          label="Sort by Name"
          @click="setSort({
            by: 'label',
            type: 'string'
          })"
        />
        <Button
          label="Sort by Date"
          @click="setSort({
            by: 'createdAt',
            type: 'date',
          })"
        />
      </div>
      <!-- End: Filter & Search Backlog Section -->
      <!-- Start: Backlog List Section -->
      <ListTransition class="mt-4">
        <div
          class="flex mb-4 items-center justify-between"
          v-for="backlog in backlogs"
          :key="backlog.id"
        >
          <TaskItem 
            :item="backlog"
            @on-task-done="tasksStore.markTaskAsDoneById(backlog.id)"
          />
          <Button size="small" label="Move to List" @click="tasksStore.setTaskAsTodoById(backlog.id)" />
        </div>
      </ListTransition>
      <!-- End: Backlog List Section -->
    </div>
    <!-- Start: New Backlog Section -->
    <div class="flex justify-between pb-12 gap-4">
      <InputText class="w-full" v-model.lazy.trim="state.newBacklog.label" />
      <Button
        label="Add Item"
        :disabled="!state.newBacklog.label"
        @click="addBacklog()"
      />
    </div>
    <!-- End: New Backlog Section -->
  </div>
</template>
<script setup lang="ts">
// Core Vue
import { reactive, computed } from 'vue'

// Components
import TaskItem from '@/components/ui/task/Item.vue'
import InputText from '@/components/ui/inputs/InputText.vue'
import Button from '@/components/ui/actions/Button.vue'
import ListTransition from '@/components/ui/transitions/ListTransition.vue'

// Types
import type { sortable, task, taskInput } from '@/types/index'

// Constants
import { TASKTYPE } from '@/constants/index'

// Helpers
import { sortArrayOfObject } from '@/helpers/sort'

// Store
import { useTasksStore } from '@/stores/tasks'
const tasksStore = useTasksStore()

// State of Component
const state = reactive({
  newBacklog: {
    label: '',
    type: TASKTYPE.BACKLOG,
  } as taskInput,
  labelQ: '',
  sort: null as null | sortable<task, keyof task>,
})

const backlogs = computed(() => {
  // Filter backlogs based on search query
  const regex = new RegExp(state.labelQ, 'i');
  const backlogs = tasksStore.getBacklogs.filter((backlog) => {
    if (!state.labelQ || backlog.label.search(regex) !== -1) {
      return true
    }
    return false
  });

  // Sort backlogs by type & field
  if (state.sort) {
    backlogs.sort(sortArrayOfObject<task, keyof task>(state.sort) as ((a: task, b: task) => number));
  }
  return backlogs;
})

// Methods
function addBacklog() {
  tasksStore.addTask(state.newBacklog as task);
  resetNewBacklog();
}

function resetNewBacklog() {
  state.newBacklog = {
    label: '',
    type: TASKTYPE.BACKLOG
  };
}

function setSort({ by, type }: sortable<task, keyof task>) {
  state.sort = {
    by,
    type,
  };
}
</script>
