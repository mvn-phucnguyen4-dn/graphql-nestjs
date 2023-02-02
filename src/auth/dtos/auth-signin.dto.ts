import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class SignUpDTO {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}

@ObjectType()
export class SigninMutationResponse {
  @Field()
  username: string;

  @Field()
  userId: string;
}
