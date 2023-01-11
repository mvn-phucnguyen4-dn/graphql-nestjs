import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { GroupEntity } from '../../models/groups/entities';

define(GroupEntity, () => {
  const group = new GroupEntity();
  group.name = faker.name.jobTitle();
  group.size = faker.datatype.number({ min: 1, max: 10 });

  return group;
});
