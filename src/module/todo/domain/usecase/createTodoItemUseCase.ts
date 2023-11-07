
export interface CreateTodoItemUseCase {
    (todoState: { invalid: boolean; errMsg: string }, todoItem: string) : { invalid: boolean; errMsg: string; todo: string }
}

export const createTodoItemUseCase = (): CreateTodoItemUseCase => (todoState: { invalid: boolean; errMsg: string }, todo: string) => {
    if (!validateTodo(todo)) {
        todoState.invalid = true;
        todoState.errMsg = 'Todo value cannot be empty';
        return {...todoState, todo: ""};
    }

    return {...todoState, todo};
}

const validateTodo = (todo: string) => {
    return todo.trim() !== "";
}