import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from 'src/shared/data-source.config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options)],
  exports: [],
})
export class PostgresProviderModule {}
