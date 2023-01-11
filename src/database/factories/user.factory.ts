import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../models/users/entities';

define(UserEntity, () => {
  const user = new UserEntity();
  user.username = faker.internet.userName();
  user.hash = faker.internet.password();

  return user;
});
