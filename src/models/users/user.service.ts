import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories';
import { UserModel } from './dtos/user.dto';
import { plainToClass } from 'class-transformer';
// import { UserWithPagination } from './dtos';
import { In } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUser(): Promise<UserModel[]> {
    const users = await this.userRepository.find();
    return plainToClass(UserModel, users, { excludeExtraneousValues: true });
  }
  // async getAllUser(page: number, size: number): Promise<UserWithPagination> {
  //   const [users, total] = await this.userRepository.findAndCount({
  //     take: size || 100,
  //     skip: (size || 100) * (page - 1),
  //   });
  //   return plainToClass(
  //     UserWithPagination,
  //     {
  //       items: plainToClass(UserModel, users, {
  //         excludeExtraneousValues: true,
  //       }),
  //       page: page,
  //       pageSize: total,
  //     },
  //     {
  //       excludeExtraneousValues: true,
  //     },
  //   );
  // }

  async getUserById(id: number): Promise<UserModel> {
    const user = await this.userRepository.findOne({ where: { id } });
    return plainToClass(UserModel, user, { excludeExtraneousValues: true });
  }

  async getUsersByGroupId(groupId: number): Promise<UserModel[]> {
    const users = await this.userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.groups', 'groups')
      .where(`groups.id = :groupId`, { groupId })
      .getMany();

    return plainToClass(UserModel, users, { excludeExtraneousValues: true });
  }

  async getUserByBatch(userIds: number[]): Promise<any[] | UserModel[]> {
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
    });
    const mappedResult = this.mapResultUserIds(userIds, users);
    return plainToClass(UserModel, mappedResult, {
      excludeExtraneousValues: true,
    });
  }

  mapResultUserIds(userIds: number[], users: UserModel[]): any[] {
    return userIds.map((userId) =>
      users.find((user) => user.id == userId || null),
    );
  }
}
