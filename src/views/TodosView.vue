<script setup lang="ts">
import { ref, type Ref, computed, onMounted, inject } from 'vue';
import TodoCreator from '../module/todo/components/TodoCreator.vue';
import TodoItem from '../module/todo/components/TodoItem.vue';
import { Icon } from '@iconify/vue';
import { TodoController } from '../module/todo/controller/todoController';
import { Todo } from '../module/todo/domain/todo';

let todoController: TodoController | undefined;
let todoList: Ref<Todo[]> = ref([]);

onMounted(() => {
  todoController = inject('todoController');
  if (todoController) {
    todoList.value = todoController.getTodoList.value;
  }
});

const todoCompleted = computed(() => {
  return todoList.value.every(todo => todo.isCompleted);
});

</script>

<template>
  <main>
    <h1>Create Todo</h1>
    <TodoCreator @create-todo="(todo: Todo) => todoController?.createTodo(todo)" />
    <ul class="todo-list" v-if="todoList.length > 0">
      <TodoItem 
        v-for="(todo) in todoList" 
        :todo="todo" 
        :id="todo.id!" 
        @toggle-complete="(todoPos: string) => todoController?.toggleTodoComplete(todoPos)"
        @edit-todo="(todoPos: string) => todoController?.toggleEditTodo(todoPos)" 
        @update-todo="(todoVal: string, todoPos: string) => todoController?.updateTodo(todoVal, todoPos)"
        @delete-todo="(todoId: string) => (todoList = todoController?.deleteTodo(todoId) as typeof Ref<Todo[]>)"
        :key="todo.id"
      />
    </ul>
    <p class="todos-msg" v-else>
      <Icon icon="noto-v1:sad-but-relieved-face" class="icon trash-icon" width="22" />
      <span>You have no todo's to complete! Add one!</span>
    </p>
    <p v-if="todoCompleted &&  todoList.length > 0" class="todos-msg">
      <Icon icon="noto-v1:party-popper" class="icon trash-icon" width="22" />
      <span>You have completed all your todos!</span>
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 16px;

  h1 {
    margin-bottom: 16px;
    text-align: center;
  }

  .todo-list {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: 24px;
    gap: 10px;
    padding: 0;
  }

  .todos-msg {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
}
</style>