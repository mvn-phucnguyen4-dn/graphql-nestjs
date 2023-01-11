import DataLoader from 'dataloader';
import { GroupModel } from 'src/models/groups/dtos';
import { TodoModel } from 'src/models/todos/dto/todo.dto';
export interface ITodoDataLoader {
  todoLoader: DataLoader<number, TodoModel>;
}

export interface IGroupDataLoader {
  groupLoader: DataLoader<number, GroupModel>;
}
