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

  async getAllTodosByGroupId(groupId: number): Promise<TodoEntity[]> {
    const todos = await this.createQueryBuilder('todos')
      .leftJoinAndSelect('todos.user', 'users')
      .leftJoin('users.groups', 'groups')
      .where('groups.id = :groupId', { groupId })
      .andWhere('todos.groupId = :groupId', { groupId })
      .orderBy('todos.createAt', 'DESC')
      .getMany();

    return todos;
  }
}
