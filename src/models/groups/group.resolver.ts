import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateGroupDTO, GroupModel, UpdateGroupDTO } from './dtos/group.dto';
import { GroupService } from './group.service';
import { UserService } from '../users/user.service';
import { UserModel } from '../users/dtos';

@Resolver(() => GroupModel)
@Resolver()
export class GroupResolver {
  constructor(
    private groupService: GroupService,
    private userService: UserService,
  ) {}

  @Query((returns) => [GroupModel], { name: 'groups' })
  async getAllGroup() {
    return this.groupService.getAllGroup();
  }

  @Query((returns) => [GroupModel], { name: 'groupsByUserId' })
  async getGroupsByUserId(@Args('userId') userId: number) {
    return this.groupService.getGroupByUserId(userId);
  }

  @Query((returns) => [GroupModel], { name: 'myGroups' })
  async getMyGroup() {
    return this.groupService.getJoinedGroup(1);
  }

  @Query((returns) => [GroupModel], { name: 'notJoinedGroup' })
  async getNotJoinedGroup() {
    return this.groupService.getNotJoinedGroup(1);
  }

  @ResolveField('users', (returns) => [UserModel])
  async getUsersByGroupIds(
    @Parent() group: GroupModel,
    // @Context() { loaders }: { loaders: IDataloaders },
    // @Info() info: any,
  ) {
    const { id: groupId } = group;
    // return this.groupService.getGroupByUserIds(userId);
    console.log(groupId, 'parent');
    const user = await this.userService.getUsersByGroupId(groupId);
    return user;
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
    @Args('groupData') groupData: UpdateGroupDTO,
    @Context('user') userData: UserModel,
  ) {
    const group = this.groupService.updateGroup(1, groupData);
    return group;
  }
}
