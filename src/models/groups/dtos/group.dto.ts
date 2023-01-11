import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserModel } from 'src/models/users/dtos';

@ObjectType()
export class GroupModel {
  @Field((type) => Int)
  @Expose()
  id: number;

  @Field((type) => String)
  @Expose()
  name: string;

  @Field((type) => Int)
  @Expose()
  size: number;

  @Field((type) => Int)
  @Expose()
  userId: number;

  @Field((type) => [UserModel])
  @Expose()
  users: UserModel[];
}

@InputType()
export class CreateGroupDTO {
  @Field((type) => String)
  name: string;

  @Field((type) => Int)
  size: number;
}

@InputType()
export class UpdateGroupDTO extends PartialType(CreateGroupDTO) {
  @Field((type) => [Int])
  userIds: [number];
}
