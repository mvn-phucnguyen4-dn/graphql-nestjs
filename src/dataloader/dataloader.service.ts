import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { IGroupDataLoader, ITodoDataLoader } from './dataloader.interface';
import { TodoModel } from 'src/models/todos/dto/todo.dto';
import { TodoService } from 'src/models/todos/todo.service';
import { GroupService } from 'src/models/groups/group.service';
import { GroupModel } from 'src/models/groups/dtos';

@Injectable()
export class DataloaderService {
  constructor(
    private todoService: TodoService,
    private groupService: GroupService,
  ) {}
  getTodosLoaders(): ITodoDataLoader {
    const todoLoader = this._createTodosLoader();
    return { todoLoader };
  }

  private _createTodosLoader() {
    return new DataLoader<number, TodoModel>(async (keys: number[]) => {
      const todos = await this.todoService.getTodoUserByBatch(keys);
      return todos;
    });
  }

  getGroupsLoaders(): IGroupDataLoader {
    const groupLoader = this._createGroupsLoader();
    return { groupLoader };
  }

  private _createGroupsLoader() {
    return new DataLoader<number, GroupModel>(async (keys: number[]) => {
      const groups = await this.groupService.getGroupsUserByBatch(keys);
      return groups;
    });
  }
}
