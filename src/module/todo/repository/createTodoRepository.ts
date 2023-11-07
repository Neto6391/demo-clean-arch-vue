import { Todo } from "../domain/todo";

export interface ICreateTodoRepository {
    loadTodoListLocalStorage(): any
    saveTodoListLocalStorage(todo: Todo): void
}

export class CreateTodoRepository implements ICreateTodoRepository {
    loadTodoListLocalStorage(): Todo[] |undefined {
        const loadTodoList: Todo[] | undefined = JSON.parse(localStorage.getItem('todoList') as string) || undefined;
        return loadTodoList;

    }
    saveTodoListLocalStorage(todo: Todo[] | Todo): void {
        localStorage.setItem('todoList', JSON.stringify(todo));
    }

}

