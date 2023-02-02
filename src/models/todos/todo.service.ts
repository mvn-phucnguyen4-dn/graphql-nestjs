import { Injectable } from '@nestjs/common';
import { TodoRepository } from './repositories/todo.repository';
import { CreateTodoDTO, TodoModel } from './dto/todo.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  async createTodo(
    userId: number,
    todoData: CreateTodoDTO,
  ): Promise<TodoModel> {
    const todo = this.todoRepository.create({ ...todoData, userId: userId });
    await this.todoRepository.save(todo);
    const newTodo = this.todoRepository.findOne({
      relations: ['user'],
      where: { id: todo.id },
    });
    return plainToClass(TodoModel, newTodo, { excludeExtraneousValues: true });
  }

  async getAll(): Promise<TodoModel[]> {
    const todos = await this.todoRepository.find({});
    return plainToClass(TodoModel, todos, { excludeExtraneousValues: true });
  }

  async getTodoUserByBatch(userIds: number[]): Promise<TodoModel[] | any[]> {
    const todos = await this.todoRepository.getAllTodosByUserIds(userIds);
    const mappedResult = this.mapResultToIds(userIds, todos);
    return plainToClass(TodoModel, mappedResult, {
      excludeExtraneousValues: true,
    });
  }

  mapResultToIds(userIds: number[], todos: TodoModel[]): any[] {
    return userIds.map((userId) =>
      todos.filter((todo) => todo.userId == userId || null),
    );
  }

  async getTodoByUserId(userId: number): Promise<TodoModel[]> {
    const todos = await this.todoRepository.find({ where: { userId } });
    console.log('totos');
    return plainToClass(TodoModel, todos, { excludeExtraneousValues: true });
  }

  async getTodosByGroupId(groupId: number): Promise<TodoModel[]> {
    const todos = await this.todoRepository.getAllTodosByGroupId(groupId);
    return plainToClass(TodoModel, todos, { excludeExtraneousValues: true });
  }

  async getTodoById(id: number): Promise<TodoModel> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return plainToClass(TodoModel, todo, { excludeExtraneousValues: true });
  }
}
