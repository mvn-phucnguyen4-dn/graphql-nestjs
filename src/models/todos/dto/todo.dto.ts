import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserModel } from 'src/models/users/dtos/user.dto';

@ObjectType()
export class TodoModel {
  @Field((type) => Int, { nullable: false })
  @Expose()
  id: number;

  @Expose()
  @Field({ nullable: true })
  name: string;

  @Expose()
  @Field({ nullable: true })
  description: string;

  @Expose()
  @Field({ nullable: false })
  status: boolean;

  @Expose()
  @Field((type) => Int, { nullable: true })
  userId: number;

  @Expose()
  @Field((type) => UserModel)
  user: UserModel;
}

@InputType()
export class CreateTodoDTO {
  @Expose()
  @Field()
  name: string;

  @Expose()
  @Field()
  description: string;

  @Expose()
  @Field()
  status: boolean;

  @Expose()
  @Field((type) => Int, { nullable: true })
  userId: number;
}

@InputType()
export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {}
