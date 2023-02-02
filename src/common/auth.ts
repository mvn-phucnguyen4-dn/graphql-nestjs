import { sign } from 'jsonwebtoken';
import { UserModel } from 'src/models/users/dtos';
import { UserEntity } from 'src/models/users/entities';

export const createToken = (
  type: 'accessToken' | 'refreshToken',
  user: UserEntity,
) =>
  sign(
    {
      userId: user.id,
      username: user.username,
    },
    type === 'accessToken'
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: type === 'accessToken' ? '15s' : '60m',
    },
  );
