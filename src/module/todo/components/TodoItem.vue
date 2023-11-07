<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';


const { todo, id } = defineProps({
    todo: {
        type: Object,
        required: true,
    },
    id: {
        type: String,
        required: true,
    }
});
const emit = defineEmits(['toggle-complete', 'edit-todo', 'update-todo', 'delete-todo']);
const isEditing = ref(todo.isEditing);


const getEditingIcon = () => (isEditing.value ? 'ph:check-circle' : 'ph:pencil-fill');
const getEditingColor = () => (isEditing.value ? '#41b080' : '#41b080');
const editTodo = () => {
       isEditing.value = !isEditing.value;
       emit('edit-todo', id);
   };
</script>

<template>
    <li class="container-todo">
        <input type="checkbox" :checked="todo.isCompleted" @input="$emit('toggle-complete', id)" />
        <div class="todo">
            <input 
              v-if="todo.isEditing" 
              type="text" 
              :value="todo.todo" 
              @input="$emit('update-todo', ($event.target as HTMLInputElement).value, id)" 
            />
            <span v-else :class="{'completed-todo': todo.isCompleted}">
                {{ todo.todo }}
            </span>
            
        </div>
        <div class="todo-actions">
            <Icon 
              v-if="todo.isEditing" 
              :icon="getEditingIcon()"
              class="icon check-icon" 
              :color="getEditingColor()" 
              width="22"
              @click="editTodo()" 
            />
            <Icon 
              v-else 
              :icon="getEditingIcon()"
              class="icon edit-icon" 
              :color="getEditingColor()" 
              width="22"
              @click="editTodo()" 
            />
            <Icon 
              icon="ph:trash" 
              class="icon trash-icon" 
              color="#f95e5e" 
              width="22" 
              @click="$emit('delete-todo', todo.id)" 
            />
        </div>
    </li>
</template>

<style lang="scss" scoped>

li {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 16px 10px;
  background-color: #f1f1f1;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  &:hover {
    .todo-actions {
      opacity: 1;
    }
  }

  input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

    &:checked {
      background-color: #41b080;
    }
  }

  .todo {
    flex: 1;

    .completed-todo {
      text-decoration: line-through;
    }

    input[type="text"] {
      width: 100%;
      padding: 2px 6px;
      border: 2px solid #41b080;
    }
  }

  .todo-actions {
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: 150ms ease-in-out;
    .icon {
      cursor: pointer;
    }
  }
}
</style>