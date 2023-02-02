import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { UserModel } from 'src/models/users/dtos/user.dto';
import { Paginated } from '../../../common/pagination';

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
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  status: boolean;

  @Field((type) => Int)
  groupId: number;
}

@InputType()
export class UpdateTodoDTO extends PartialType(CreateTodoDTO) {}

@ObjectType()
export class PaginatedTodo extends Paginated(TodoModel) {}
