import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import {
  ApolloError,
  ForbiddenError,
  ValidationError,
} from 'apollo-server-express';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { GroupService } from '../groups/group.service';
import { UserRepository } from './repositories';
import { UserEntity } from './entities';
import {
  IGroupDataLoader,
  ITodoDataLoader,
} from 'src/dataloader/dataloader.interface';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserModel,
  UserWithPagination,
} from './dtos';
import { TodoModel } from '../todos/dto/todo.dto';
import { GroupModel } from '../groups/dtos/group.dto';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
    private groupService: GroupService,
  ) {}

  @Query((returns) => UserWithPagination, { name: 'users' })
  async getAllUser(
    @Args('page') page: number,
    @Args('size') size: number,
  ): Promise<UserWithPagination> {
    return this.userService.getAllUser(page, size);
  }

  @Query((returns) => UserModel, { name: 'user' })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @ResolveField('todos', (returns) => [TodoModel])
  async getTodosByUserIds(
    @Parent() user: UserModel,
    @Context() { todoLoaders }: { todoLoaders: ITodoDataLoader },
  ) {
    const { id: userId } = user;
    return todoLoaders.todoLoader.load(userId);
  }

  @ResolveField('groups', (returns) => [GroupModel])
  async getGroupsByUserIds(
    @Parent() user: UserModel,
    @Context() { groupLoaders }: { groupLoaders: IGroupDataLoader },
  ) {
    const { id: userId } = user;
    return groupLoaders.groupLoader.load(userId);
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args('input') input: CreateUserDTO): Promise<UserModel> {
    try {
      const { username } = input;

      const existedUser = await this.userRepository.findOne({
        where: { username },
      });
      if (existedUser) {
        throw new ForbiddenError('User already exists.');
      }

      const createUser: UserEntity = this.userRepository.create({
        ...input,
      });

      await this.userRepository.save(createUser);
      return plainToClass(UserModel, createUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new ApolloError(error);
    }
  }

  @Mutation((returns) => UserModel, { name: 'updateUser' })
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: UpdateUserDTO,
  ): Promise<UserModel> {
    try {
      const { hash } = input;
      const user = await this.userRepository.find({ where: { id } });
      if (!user) throw new ForbiddenError('User not found.');
      if (hash.trim().length < 8) {
        throw new ValidationError('Password must be greater or equal 8 aphal');
      }
      const updateUser = this.userRepository.create({ id, ...input });
      await this.userRepository.save(updateUser);
      return plainToClass(UserModel, updateUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new ApolloError(error);
    }
  }
}
