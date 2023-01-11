import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { TodoModule } from 'src/models/todos/todo.module';
import { GroupModule } from 'src/models/groups/group.module';

@Module({
  imports: [TodoModule, GroupModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataLoaderModule {}
