import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { TodoEntity } from '../../models/todos/entities';

define(TodoEntity, () => {
  const todo = new TodoEntity();
  todo.name = faker.lorem.sentence();
  todo.description = faker.lorem.paragraph();
  todo.status = faker.datatype.boolean();
  return todo;
});
