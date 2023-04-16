<template>
  <header class="pt-7.5">
    <TabMenu :items="state.menuItems" />
  </header>
  <RouterView />
</template>
<script setup lang="ts">
// Core Vue
import { reactive } from 'vue'

// Package Composables
import { RouterView } from 'vue-router'

// Components
import TabMenu from '@/components/TabMenu.vue'

// Types
import type { menu } from '@/types'

// State of Component
const state = reactive({
  menuItems: [
    {
      label: 'To Do List',
      to: '/todo'
    },
    {
      label: 'Backlog',
      to: '/backlog'
    }
  ] as menu[]
})
</script>
