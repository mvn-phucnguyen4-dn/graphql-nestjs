import {
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TodoModel } from 'src/models/todos/dto/todo.dto';

@ObjectType()
export class UserModel {
  @Field((type) => Int, { nullable: false })
  @Expose()
  id: number;

  @Field({ nullable: false })
  @Expose()
  username: string;

  @Field((type) => [TodoModel])
  @Expose()
  todos: TodoModel[];
}

@InputType()
export class CreateUserDTO {
  @ApiProperty()
  @Field((type) => String, { nullable: false })
  username: string;

  @ApiProperty()
  @Field()
  hash: string;
}

@InputType()
export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
