import { Todo } from "../todo";
import type { CreateTodoRepository } from "../../repository/createTodoRepository";
import { type Ref, ref, watch } from "vue";

export interface ICreateTodoUseCase {
    createTodo(todo: Todo): void
    getTodoList(): Ref<Todo[]>
    toggleTodoComplete(todoPos: number): void
    toggleEditTodo(todoPos: number): void
    updateTodo(todoVal: string, todoPos: number): void
    deleteTodo(todoId: string): void
}

export class CreateTodoUseCase implements ICreateTodoUseCase {
    private todoList: Ref<Todo[]> = ref([]);

    constructor(private createTodoRepository: CreateTodoRepository) {
        this.loadTodoList();
    }

    createTodo(todo: Todo): void {
        this.todoList.value.push(todo);
    }

    private loadTodoList(): void {
        const savedTodoList: Todo[] | undefined = this.createTodoRepository.loadTodoListLocalStorage();
        if (savedTodoList!.length > 0) {
            this.todoList.value = savedTodoList as Todo[];
        }

        watch(this.todoList, () => {
            this.createTodoRepository.saveTodoListLocalStorage(this.todoList.value);
        }, {
            deep: true
        });
    }

    getTodoList(): Ref<Todo[]> {
        return this.todoList;
    }

    toggleTodoComplete(todoId: string): void {
        const index = this.todoList.value.findIndex((todo) => todo.id === todoId);
        this.todoList.value[index].isCompleted = !this.todoList.value[index].isCompleted;
    }
    toggleEditTodo(todoId: string): void {
        const index = this.todoList.value.findIndex((todo) => todo.id === todoId);
        this.todoList.value[index].isEditing = !this.todoList.value[index].isEditing;
    }
    updateTodo(todoVal: string, todoId: string): void {
        const index = this.todoList.value.findIndex((todo) => todo.id === todoId);
        this.todoList.value[index].todo = todoVal;
    }
    deleteTodo(todoId: string): void {
        this.todoList.value = this.todoList.value.filter((todo) => todo.id !== todoId);
    }
}