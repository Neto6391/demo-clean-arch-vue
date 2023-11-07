<script setup lang="ts">
import {RouterView } from 'vue-router'
import TodoHeader from './presentation/components/TodoHeader.vue';
import { TodoController } from './module/todo/controller/todoController';
</script>

<template>
  <TodoHeader />
  <RouterView />
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap');

* {
  font-family: "Rubik", "sans-serif";
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}
</style>