import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { TodoModule } from 'src/models/todos/todo.module';
import { GroupModule } from 'src/models/groups/group.module';
import { UserModule } from 'src/models/users/user.module';

@Module({
  imports: [TodoModule, GroupModule, UserModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataLoaderModule {}
