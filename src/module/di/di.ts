import { TodoController } from "../todo/controller/todoController";
import { createTodoItemUseCase } from "../todo/domain/usecase/createTodoItemUseCase";
import { CreateTodoUseCase } from "../todo/domain/usecase/createTodoUseCase";
import { CreateTodoRepository } from "../todo/repository/createTodoRepository";

const createTodoRepositoryImpl = new CreateTodoRepository();
const createTodoUseCaseImpl = new CreateTodoUseCase(createTodoRepositoryImpl);
const createTodoItemUseCaseImpl =  createTodoItemUseCase();


const todoController =  () => new TodoController(
    createTodoItemUseCaseImpl,
    createTodoUseCaseImpl,
);

export { todoController };