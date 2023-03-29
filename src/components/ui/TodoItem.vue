<template>
  <div class="flex">
    <a v-if="checked" href="javascript:void(0)" @click="$emit('onUnchecked')">
      <IconChecked class="ml-1.5 mr-1" />
    </a>
    <a v-else href="javascript:void(0)" @click="$emit('onChecked')">
      <IconNotChecked />
    </a>
    <div class="ml-2">
      <p class="text-15px" :class="[checked ? 'text-dark-gray line-through' : 'text-black']">
        {{ item.label }}
      </p>
      <p class="text-10px text-dark-gray mt-0.5">
        {{ item.formattedTime }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Core Vue
import { computed, useAttrs, onBeforeUnmount } from 'vue'

// Icons
import IconChecked from '@/components/icons/IconChecked.vue'
import IconNotChecked from '@/components/icons/IconNotChecked.vue'

// Types
import type { todo } from '@/types/index'

// Emits
const emits = defineEmits(['onChecked', 'onUnchecked', 'onRemove'])

// Fallback Attributes
const attrs = useAttrs()

// Computed Properties
const checked = computed(() => {
  return attrs.checked === undefined ? false : true
})

// Props
defineProps<{
  item: todo
}>()

onBeforeUnmount(() => {
  emits('onRemove')
})
</script>
