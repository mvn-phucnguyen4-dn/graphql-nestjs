import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }

  async getAllUsersByTodoIds(todoIds: number[]): Promise<UserEntity[]> {
    const users = await this.createQueryBuilder('users')
      .leftJoin('users.todos', 'todos')
      .where('users.id in :todoIds', { todoIds })
      .getMany();

    return users;
  }
}
