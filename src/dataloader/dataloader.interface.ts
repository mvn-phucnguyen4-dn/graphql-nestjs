import DataLoader from 'dataloader';
import { GroupModel } from 'src/models/groups/dtos';
import { TodoModel } from 'src/models/todos/dto/todo.dto';
import { UserModel } from 'src/models/users/dtos';
export interface ITodoDataLoader {
  todoLoader: DataLoader<number, TodoModel>;
}

export interface IGroupDataLoader {
  groupLoader: DataLoader<number, GroupModel>;
}

export interface IUserDataLoader {
  userLoader: DataLoader<number, UserModel>;
}
