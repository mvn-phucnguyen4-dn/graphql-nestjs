import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DataLoaderModule } from 'src/dataloader/dataloader.module';
import { DataloaderService } from 'src/dataloader/dataloader.service';
import * as depthLimit from 'graphql-depth-limit';
@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          validationRules: [depthLimit(7)],
          subscriptions: {
            'graphql-ws': true,
            // 'graphql-ws': {
            //   onConnect: () => {
            //     console.log('connected');
            //   },
            // },
          },
          // introspection: false,
          // autoSchemaFile: true,
          context: () => ({
            todoLoaders: dataloaderService.getTodosLoaders(),
            groupLoaders: dataloaderService.getGroupsLoaders(),
            userLoaders: dataloaderService.getUsersLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
  ],
})
export class GraphQLProviderModule {}
