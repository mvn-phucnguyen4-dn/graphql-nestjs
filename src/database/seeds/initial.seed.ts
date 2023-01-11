import { Factory, Seeder } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { TodoEntity } from '../../models/todos/entities';
import { UserEntity } from '../../models/users/entities';
import { GroupEntity } from '../../models/groups/entities';

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const users: UserEntity[] = await factory(UserEntity)().createMany(20);

    const groups: GroupEntity[] = await factory(GroupEntity)()
      .map(async (group) => {
        group.userId = faker.helpers.arrayElement(users.map((user) => user.id));
        const usersInGroup: UserEntity[] = faker.helpers.arrayElements(
          users.filter((user) => user.id != group.userId),
        );
        group.users = usersInGroup;
        return group;
      })
      .createMany(30);
    const todos: TodoEntity[] = await factory(TodoEntity)()
      .map(async (todo) => {
        todo.userId = faker.helpers.arrayElement(users.map((user) => user.id));
        return todo;
      })
      .createMany(20);
  }
}
