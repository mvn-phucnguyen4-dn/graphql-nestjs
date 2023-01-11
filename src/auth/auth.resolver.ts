import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserRepository } from 'src/models/users/repositories';
import { AuthService } from './auth.service';
import { UserModel } from 'src/models/users/dtos/user.dto';
import { SignUpDTO, SigninDTO } from './dtos';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
  ) {}

  @Mutation((returns) => UserModel, { name: 'signin' })
  async signin(@Args('input') input: SigninDTO) {
    return this.authService.signin(input);
  }

  @Mutation((returns) => UserModel, { name: 'signup' })
  async signup(@Args('input') input: SignUpDTO) {
    return this.authService.signup(input);
  }
}
