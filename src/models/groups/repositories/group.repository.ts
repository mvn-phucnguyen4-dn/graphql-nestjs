import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { GroupEntity } from '../entities';
@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
  constructor(private datasource: DataSource) {
    super(GroupEntity, datasource.createEntityManager());
  }

  async getAllGroupsByUserIds(
    userIds: readonly number[],
  ): Promise<GroupEntity[]> {
    const todos = await this.find({ where: { userId: In([...userIds]) } });
    return todos;
  }

  async getJoinedGroup(userId: number): Promise<GroupEntity[]> {
    const [groups, number] = await this.createQueryBuilder('groups')
      .leftJoinAndSelect('groups.users', 'users')
      .where(`users.id = :userId`, { userId })
      .orWhere(`groups.userId = :userId`, { userId })
      .getManyAndCount();
    return groups;
  }
}
