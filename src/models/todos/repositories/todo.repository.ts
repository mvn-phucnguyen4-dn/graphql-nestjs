import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { TodoEntity } from '../entities';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private datasource: DataSource) {
    super(TodoEntity, datasource.createEntityManager());
  }

  async getAllTodosByUserIds(
    userIds: readonly number[],
  ): Promise<TodoEntity[]> {
    const todos = await this.find({ where: { userId: In([...userIds]) } });
    return todos;
  }
}
