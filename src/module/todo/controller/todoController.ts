import { type Ref } from "vue";
import type { Todo } from "../domain/todo";
import type { CreateTodoItemUseCase } from "../domain/usecase/createTodoItemUseCase";
import type { CreateTodoUseCase } from "../domain/usecase/createTodoUseCase";

export class TodoController {
    
    constructor(
        private createTodoItemUseCase: CreateTodoItemUseCase,
        private createTodoUseCase: CreateTodoUseCase,
    ) {}

    createTodoItem(todoState: { invalid: boolean; errMsg: string }, todoItem: string): { invalid: boolean; errMsg: string; todo: string } {
        return this.createTodoItemUseCase(todoState, todoItem);
    }

    createTodo(todo: Todo) {
        this.createTodoUseCase.createTodo(todo);
    }

    get getTodoList(): Ref<Todo[]> {
        return this.createTodoUseCase.getTodoList();
    }

    toggleTodoComplete(todoId: string) {
        this.createTodoUseCase.toggleTodoComplete(todoId);
    }
    toggleEditTodo(todoId: string) {
        this.createTodoUseCase.toggleEditTodo(todoId);
    }
    updateTodo(todoVal: string, todoId: string) {
        this.createTodoUseCase.updateTodo(todoVal, todoId);
    }
    deleteTodo(todoId: string) {
        this.createTodoUseCase.deleteTodo(todoId);
        return this.getTodoList.value;
    }
}