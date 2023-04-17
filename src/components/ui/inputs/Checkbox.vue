<template>
  <input
    class="appearance-none w-6 h-6 border border-light-gray rounded-full cursor-pointer bg-white hover:bg-light-blue hover:after:content-checkmark hover:after:flex hover:after:justify-center checked:bg-blue checked:border-blue checked:after:content-checkmark checked:after:flex checked:after:justify-center"
    type="checkbox"
    :checked="modelValue"
    @change="handleChange"
  />

</template>

<script setup lang="ts">
// Props
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emits = defineEmits(['update:modelValue'])

// Methods
function handleChange(event: Event) {
  emits('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>