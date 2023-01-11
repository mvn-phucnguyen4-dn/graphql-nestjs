import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [PostgresConfigService, ConfigService],
  exports: [PostgresConfigService, ConfigService],
})
export class PostgresConfigModule {}
