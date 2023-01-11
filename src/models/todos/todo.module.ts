import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities';
import { TodoService } from './todo.service';
import { TodoRepository } from './repositories/todo.repository';
import { TodoController } from './todo.controller';
import { TodoResolver } from './todo.resolver';
import { UserModule } from '../users/user.module';
import { UserService } from '../users/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoRepository, TodoResolver, UserService],
  exports: [TodoService, TodoRepository],
})
export class TodoModule {}
