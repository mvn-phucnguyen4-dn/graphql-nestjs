import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DataLoaderModule } from 'src/dataloader/dataloader.module';
import { DataloaderService } from 'src/dataloader/dataloader.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          installSubscriptionHandlers: true,
          // introspection: false,
          // autoSchemaFile: true,
          context: () => ({
            todoLoaders: dataloaderService.getTodosLoaders(),
            groupLoaders: dataloaderService.getGroupsLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
  ],
})
export class GraphQLProviderModule {}
