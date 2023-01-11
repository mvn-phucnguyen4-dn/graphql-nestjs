import { Injectable } from '@nestjs/common';
import { TodoRepository } from './repositories/todo.repository';
import { TodoModel } from './dto/todo.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

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
    return plainToClass(TodoModel, todos, { excludeExtraneousValues: true });
  }

  async getTodoById(id: number): Promise<TodoModel> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    return plainToClass(TodoModel, todo, { excludeExtraneousValues: true });
  }

  // async getTodosByGroupIds(groupId: number): Promise<TodoModel[]> {
  //   const todo = await this.todoRepository.find({
  //     relations: ['users', 'users.groups'],
  //     where: { 'users.groups': { id: groupId } },
  //   });
  // }

  async addTodo(todoData: TodoModel): Promise<TodoModel> {
    const todo = this.todoRepository.create({ ...todoData });
    await this.todoRepository.save(todo);
    return todo;
  }
}
