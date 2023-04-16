<template>
  <ul class="px-4 md:px-0 flex gap-8 border-b border-chrome text-28px font-bold">
    <li v-for="item in items" :key="item.to">
      <router-link
        class="block pb-3 "
        :class="[item.to === route.path ? 'text-black' : 'text-gray']"
        :to="item.to"
      >
        {{ item.label }}
      </router-link>
      <span v-show="item.to === route.path" class="h-1 bg-blue rounded-full block"></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

// Package Composables
import { useRoute } from 'vue-router'

// Types
import type { menu } from '@/types'

const route = useRoute()

// Props
defineProps({
  items: {
    type: Object as PropType<menu[]>,
    default: []
  },
})
</script>
