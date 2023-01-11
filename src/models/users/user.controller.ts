import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
}
