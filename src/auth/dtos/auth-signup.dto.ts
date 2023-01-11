import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SigninDTO {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
