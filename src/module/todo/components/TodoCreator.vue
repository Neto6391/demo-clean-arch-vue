<script setup lang="ts">
import { reactive, defineEmits, inject, onMounted } from 'vue';
import TodoButton from '@/presentation/components/TodoButton.vue'
import type { TodoController } from '../controller/todoController';
import { Todo } from '../domain/todo';
import { uid } from 'uid';

const emit = defineEmits(['create-todo'])

const todoState = reactive({
    todo: "",
    invalid: false,
    errMsg: "",
});

let todoController: TodoController | undefined;

onMounted(() => {
  todoController = inject('todoController');
})

const createTodo = () => {
    todoState.invalid = false;
    todoState.errMsg = "";
    const todoItem = todoController?.createTodoItem(todoState, todoState.todo);
    if (todoItem) {
      todoState.todo = todoItem.todo;
      todoState.invalid = todoItem.invalid;
      todoState.errMsg = todoItem.errMsg;  
    }
 
    if (todoState.todo !== "") {
        const todo: Todo = new Todo(
            {
              id: uid(),
              todo: todoState.todo,
              isCompleted: false,
              isEditing: false
            }
          );
        emit("create-todo", 
          todo
        );
        todoState.todo = "";
        return;
    }
}
</script>

<template>
    <div class="input-wrap" :class="{ 'input-err' : todoState.invalid}">
        <input type="text" v-model="todoState.todo"/>
        <TodoButton @click="createTodo()">Create</TodoButton>
    </div>
    <p v-show="todoState.invalid" class="err-msg">{{ todoState.errMsg }}</p>
</template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

  &.input-err {
    border-color: red;
  }

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.err-msg {
  margin-top: 6px;
  font-size: 12px;
  text-align: center;
  color: red;
}
</style>