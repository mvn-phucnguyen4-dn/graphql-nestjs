import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { TodoService } from './todo.service';
import { CreateTodoDTO, PaginatedTodo, TodoModel } from './dto/todo.dto';
import { UserModel } from '../users/dtos';
import { IUserDataLoader } from 'src/dataloader/dataloader.interface';
import { convertCursorToNodeId, convertNodeIdToCursor } from 'src/utils';
import { plainToClass } from 'class-transformer';

const pubSub = new PubSub();
@Resolver(() => TodoModel)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query((returns) => PaginatedTodo, { name: 'todos' })
  async getAllTodo(
    @Args('first') first: number,
    @Args('after') after: string,
    @Args('offset') offset: number,
  ) {
    const todos = await this.todoService.getAll();
    let afterIndex = offset;
    if (typeof after === 'string') {
      /* Extracting nodeId from after */
      const nodeId = +convertCursorToNodeId(after);
      /* Finding the index of nodeId */
      const nodeIndex = todos.findIndex((user) => user.id === nodeId);
      if (nodeIndex >= 0) {
        afterIndex += nodeIndex + 1; // 1 is added to exclude the afterIndex node and include items after it
      }
    }
    const slicedTodos = todos.slice(afterIndex, afterIndex + first);
    const edges = slicedTodos.map((node: TodoModel) => ({
      node,
      cursor: convertNodeIdToCursor(node),
    }));
    let startCursor,
      endCursor = null;
    if (edges.length > 0) {
      startCursor = convertNodeIdToCursor(edges[0].node);
      endCursor = convertNodeIdToCursor(edges[edges.length - 1].node);
    }
    const hasNextPage = todos.length > afterIndex + first;
    return plainToClass(
      PaginatedTodo,
      {
        edges,
        endCursor,
        hasNextPage,
        totalCount: todos.length,
      },
      { excludeExtraneousValues: true },
    );
  }

  @Query((returns) => TodoModel, { name: 'todo' })
  async getTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.getTodoById(id);
  }

  @ResolveField('user', (returns) => UserModel)
  async getUserByTodo(
    @Parent() todo: TodoModel,
    @Context() { userLoaders }: { userLoaders: IUserDataLoader },
  ) {
    const { userId } = todo;
    return userLoaders.userLoader.load(userId);
  }

  @Mutation((returns) => TodoModel, { name: 'createTodo' })
  async createTodo(@Args('todoData') todoData: CreateTodoDTO) {
    const newTodo = await this.todoService.createTodo(21, todoData);
    pubSub.publish('todoAdded', { todoAdded: newTodo });
    return newTodo;
  }

  @Subscription((returns) => TodoModel, { name: 'todoAdded' })
  async todoAdded() {
    return pubSub.asyncIterator('todoAdded');
  }
}
