import {
  Args,
  Context,
  Directive,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateGroupDTO, GroupModel, UpdateGroupDTO } from './dtos/group.dto';
import { TodoModel } from '../todos/dto/todo.dto';
import { GroupService } from './group.service';
import { UserService } from '../users/user.service';
import { UserModel } from '../users/dtos';
import { TodoService } from '../todos/todo.service';

const pubSub = new PubSub();
@Resolver(() => GroupModel)
@Resolver()
export class GroupResolver {
  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private todoService: TodoService,
  ) {}

  @Directive(
    '@deprecated(reason: "This query will be removed in the next version")',
  )
  @Query((returns) => [GroupModel], { name: 'groups' })
  async getAllGroup() {
    return this.groupService.getAllGroup();
  }

  @Query((returns) => GroupModel, { name: 'groupById' })
  async getGroupById(@Args('groupId') groupId: number) {
    return this.groupService.getGroupById(groupId);
  }

  @Query((returns) => [GroupModel], { name: 'groupsByUserId' })
  async getGroupsByUserId(@Args('userId') userId: number) {
    return this.groupService.getGroupByUserId(userId);
  }

  @Query((returns) => [GroupModel], { name: 'myGroups' })
  async getMyGroup() {
    // console.log('getmygroup');
    return this.groupService.getJoinedGroup(21);
  }

  @Query((returns) => [GroupModel], { name: 'notJoinedGroup' })
  async getNotJoinedGroup() {
    return this.groupService.getNotJoinedGroup(21);
  }

  @ResolveField('users', (returns) => [UserModel])
  async getUsersByGroupIds(
    @Parent() group: GroupModel,
    // @Context() { loaders }: { loaders: IDataloaders },
    // @Info() info: any,
  ) {
    const { id: groupId } = group;
    // return this.groupService.getGroupByUserIds(userId);
    // console.log(groupId, 'parent');
    const user = await this.userService.getUsersByGroupId(groupId);
    return user;
    // return loaders.todoLoader.load(userId);
  }

  @ResolveField('todos', (returns) => [TodoModel])
  async getTodosByGroupIds(
    @Parent() group: GroupModel,
    // @Context() { loaders }: { loaders: IDataloaders },
    // @Info() info: any,
  ) {
    const { id: groupId } = group;
    // return this.groupService.getGroupByUserIds(userId);
    // console.log(groupId, 'parent');
    const todos = await this.todoService.getTodosByGroupId(groupId);
    return todos;
    // return loaders.todoLoader.load(userId);
  }

  @Mutation((returns) => GroupModel, { name: 'createGroup' })
  async createGroup(
    @Args('groupData') groupData: CreateGroupDTO,
    @Context('user') userData: UserModel,
  ) {
    // const { id: userId } = userData;
    const group = this.groupService.createGroup(1, groupData);
    return group;
  }

  @Mutation((returns) => GroupModel, { name: 'updateGroup' })
  async updateGroup(
    @Args('groupId') groupId: number,
    @Args('groupData') groupData: UpdateGroupDTO,
  ) {
    const group = this.groupService.updateGroup(groupId, groupData);
    return group;
  }
}
