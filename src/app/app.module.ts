import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresProviderModule } from 'src/provider/postgres/provider.module';
import { AppConfigModule } from 'src/config/app/config.module';
import { UserModule } from 'src/models/users/user.module';
import { TodoModule } from 'src/models/todos/todo.module';
import { GraphQLProviderModule } from 'src/provider/graphQl/provider.module';
import { AuthModule } from 'src/auth/auth.module';
import { GroupModule } from 'src/models/groups/group.module';

@Module({
  imports: [
    PostgresProviderModule,
    AppConfigModule,
    GraphQLProviderModule,
    UserModule,
    TodoModule,
    GroupModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
