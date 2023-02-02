import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/models/users/dtos/user.dto';
import { UserRepository } from 'src/models/users/repositories';
import { SignUpDTO, SigninDTO } from './dtos';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import * as bcrypt from 'bcryptjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async signin(signinData: SigninDTO): Promise<UserModel> {
    const { username, password } = signinData;

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (!existingUser) throw new ForbiddenError('User not found');
    const passwordIsMatch = bcrypt.compareSync(password, existingUser.hash);
    if (!passwordIsMatch) throw new AuthenticationError('Password incorrect!');
    return plainToClass(UserModel, existingUser, {
      excludeExtraneousValues: true,
    });
  }

  async signup(signupData: SignUpDTO): Promise<UserModel> {
    const { username, password } = signupData;
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) throw new ForbiddenError('User existed!');

    const newUser = this.userRepository.create({
      username: username,
      hash: password,
    });
    await this.userRepository.save(newUser);
    return plainToClass(UserModel, newUser, {
      excludeExtraneousValues: true,
    });
  }
}
