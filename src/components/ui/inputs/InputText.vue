<template>
  <input
    class="py-3 px-3.75 border border-light-gray rounded text-15px focus:outline-none focus:border-blue focus:shadow-none"
    :class="{
      'shadow-inputtext': modelValue,
    }"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  />
</template>
<script setup lang="ts">
// Props
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

// Emits
const emits = defineEmits(['update:modelValue'])

// Methods
function handleInput(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>
