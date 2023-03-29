<template>
  <transition-group
    enter-active-class="animate-todo-enter"
    leave-active-class="animate-todo-leave"
    tag="div"
  >
    <slot></slot>
  </transition-group>
</template>
<script setup lang="ts"></script>
