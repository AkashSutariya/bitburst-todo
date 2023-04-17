<template>
  <button
    class="border rounded whitespace-nowrap font-medium"
    :class="[
        size === 'default' ?
        'py-3 px-3.75 border-dark-blue bg-blue hover:border-blue hover:bg-light-blue disabled:border-gray disabled:bg-light-gray text-white text-15px'
        : '',
        size === 'small' ?
        'py-2 px-3 border-light-gray hover:text-dark-blue hover:border-dark-gray text-blue text-13px'
        : '',
      ]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
// Props
defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'default',
    validator(value: string) {
      return ['default', 'small'].includes(value)
    }
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>
