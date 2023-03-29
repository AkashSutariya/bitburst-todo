<template>
  <ul class="flex gap-8 border-b border-chrome px-4 md:px-0">
    <li v-for="item in items">
      <router-link
        class="block pb-3 text-28px font-bold"
        :class="[item.to === route.path ? 'text-black' : 'text-gray']"
        :to="item.to"
      >
        {{ item.label }}
      </router-link>
      <span v-if="item.to === route.path" class="h-1 bg-blue rounded-full block"></span>
    </li>
  </ul>
</template>

<script setup lang="ts">
// Package Composables
import { useRoute } from 'vue-router'

// Types
import type { menu } from '@/types'

const route = useRoute()

// Props
defineProps<{
  items: menu[]
}>()
</script>
