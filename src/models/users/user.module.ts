import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserService } from './user.service';
import { UserRepository } from './repositories';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { TodoModule } from '../todos/todo.module';
import { GroupModule } from '../groups/group.module';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TodoModule, GroupModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService, UserRepository, UserResolver],
})
export class UserModule {}
