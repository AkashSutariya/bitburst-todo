<template>
  <div class="flex">
    <Checkbox
      v-model="state.isDone"
    />
    <div class="ml-2">
      <p class="text-15px" :class="[state.isDone ? 'text-dark-gray line-through' : 'text-black']">
        {{ item.label }}
      </p>
      <p class="mt-0.5 text-10px text-dark-gray">
        {{ item.createdAt.toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Core Vue
import { onBeforeUnmount, reactive, watch } from 'vue'


// Components
import Checkbox from '@/components/ui/inputs/Checkbox.vue'

// Types
import type { task } from '@/types/index'
import type { PropType } from 'vue'


// Emits
const emits = defineEmits(['onTaskDone', 'onTaskUndone', 'onRemove'])

// Props
const props = defineProps({
  item: {
    type: Object as PropType<task>,
    default: {}
  },
})

const state = reactive({
  isDone: props.item.isDone,
});

watch(
  () => state.isDone,
  (value) => {
    if (value) {
      emits('onTaskDone')
    } else {
      emits('onTaskUndone')
    }
  }
)

onBeforeUnmount(() => {
  emits('onRemove')
})
</script>
