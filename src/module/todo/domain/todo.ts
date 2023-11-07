
interface TodoI {
    id: string; 
    todo: string; 
    isEditing: boolean; 
    isCompleted: boolean;
}

export class Todo {
    id?: string; 
    todo?: string; 
    isEditing?: boolean; 
    isCompleted?: boolean;

    constructor(todoData: Partial<TodoI>) {
        Object.assign(this, todoData);
    }
}
