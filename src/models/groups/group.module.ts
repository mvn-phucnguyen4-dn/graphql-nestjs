import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './entities';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { GroupRepository } from './repositories';
import { UserModule } from '../users/user.module';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [GroupService, GroupResolver, GroupRepository, UserService],
  exports: [GroupService, GroupResolver],
})
export class GroupModule {}
