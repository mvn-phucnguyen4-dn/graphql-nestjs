import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }
}
