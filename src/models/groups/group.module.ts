import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { GroupRepository } from './repositories';
import { UserModule } from '../users/user.module';
import { TodoModule } from '../todos/todo.module';
import { UserService } from '../users/user.service';
import { TodoService } from '../todos/todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => TodoModule),
  ],
  providers: [
    GroupService,
    GroupResolver,
    GroupRepository,
    UserService,
    TodoService,
  ],
  exports: [GroupService, GroupResolver],
})
export class GroupModule {}
