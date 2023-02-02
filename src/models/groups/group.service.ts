import { Injectable } from '@nestjs/common';
import { GroupRepository } from './repositories';
import { plainToClass } from 'class-transformer';
import { CreateGroupDTO, GroupModel, UpdateGroupDTO } from './dtos/group.dto';
import { UserEntity } from '../users/entities';
import { Directive } from '@nestjs/graphql';
import { GroupEntity } from './entities';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async getAllGroup(): Promise<GroupModel[]> {
    const groups = await this.groupRepository.find({});
    return plainToClass(GroupModel, groups, { excludeExtraneousValues: true });
  }

  async getGroupById(groupId: number): Promise<GroupModel> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
    });
    return plainToClass(GroupModel, group, { excludeExtraneousValues: true });
  }

  async getGroupsUserByBatch(userIds: number[]): Promise<GroupModel[] | any[]> {
    const groups = await this.groupRepository.getAllGroupsByUserIds(userIds);
    const mappedResult = this.mapResultToIds(userIds, groups);
    return plainToClass(GroupModel, mappedResult, {
      excludeExtraneousValues: true,
    });
  }

  mapResultToIds(userIds: number[], groups: GroupEntity[]): any[] {
    return userIds.map((userId) =>
      groups.filter((group) => group.userId == userId || null),
    );
  }

  async getGroupByUserId(userId: number): Promise<GroupModel[]> {
    const groups = await this.groupRepository.find({ where: { userId } });
    return plainToClass(GroupModel, groups, { excludeExtraneousValues: true });
  }

  async getJoinedGroup(userId: number): Promise<GroupModel[]> {
    const groups = await this.groupRepository.getJoinedGroup(userId);
    return plainToClass(GroupModel, groups, { excludeExtraneousValues: true });
  }

  async getNotJoinedGroup(userId: number): Promise<GroupModel[]> {
    const joinedGroups = await this.groupRepository.getJoinedGroup(userId);
    const allGroups = await this.groupRepository.find({});
    const notJoinedGroups = allGroups.filter(
      (group) =>
        !joinedGroups.map((joinedGroup) => joinedGroup.id).includes(group.id),
    );
    return plainToClass(GroupModel, notJoinedGroups, {
      excludeExtraneousValues: true,
    });
  }

  async createGroup(
    userId: number,
    groupData: CreateGroupDTO,
  ): Promise<GroupModel> {
    const group = this.groupRepository.create({ ...groupData, userId: userId });
    await this.groupRepository.save(group);
    return plainToClass(GroupModel, group, { excludeExtraneousValues: true });
  }

  async updateGroup(
    id: number,
    groupData: UpdateGroupDTO,
  ): Promise<GroupModel> {
    const group: GroupEntity = await this.groupRepository.findOne({
      where: { id: id },
    });

    if (group.size < groupData?.userIds.length)
      throw new ApolloError('Room full');
    const updateGroup = this.groupRepository.create({ id, ...groupData });
    updateGroup.users = [];
    if (groupData.userIds) {
      for (const userId of groupData.userIds) {
        const user = new UserEntity();
        user.id = userId;
        updateGroup.users.push(user);
      }
    }
    await this.groupRepository.save(updateGroup);
    return plainToClass(GroupModel, updateGroup, {
      excludeExtraneousValues: true,
    });
  }
}
