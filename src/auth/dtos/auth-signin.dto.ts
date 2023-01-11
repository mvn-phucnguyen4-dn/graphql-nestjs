import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class SignUpDTO {
  // @ApiProperty()
  @Field({ nullable: false })
  username: string;

  // @ApiProperty()
  @Field({ nullable: false })
  password: string;
}
