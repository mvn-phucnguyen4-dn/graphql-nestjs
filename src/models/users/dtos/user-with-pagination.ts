import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationObject } from 'src/common/pagination';
import { UserModel } from './user.dto';
import { Expose } from 'class-transformer';

@ObjectType()
export class UserWithPagination extends PaginationObject {
  @Expose()
  @Field(() => [UserModel])
  readonly items: UserModel[] = [];
}
