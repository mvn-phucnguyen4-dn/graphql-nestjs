import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { TodoModel } from './dto/todo.dto';
import { UserModel } from '../users/dtos';
import { UserService } from '../users/user.service';

@Resolver(() => TodoModel)
export class TodoResolver {
  constructor(
    private todoService: TodoService,
    private userService: UserService,
  ) {}

  @Query((returns) => [TodoModel], { name: 'todos' })
  async getAllTodo() {
    return this.todoService.getAll();
  }

  @Query((returns) => TodoModel, { name: 'todo' })
  async getTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.getTodoById(id);
  }

  @ResolveField('user', (returns) => UserModel)
  async getUserByTodo(
    @Parent() todo: TodoModel,
    // @Context() { loaders }: { loaders: IDataloaders },
    // @Info() info: any,
  ) {
    const { userId } = todo;
    return this.userService.getUserById(userId);
    // return loaders.todoLoader.load(userId);
  }
}
