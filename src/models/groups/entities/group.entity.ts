import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'int', name: 'size' })
  size: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToMany(() => UserEntity, (user) => user.groups)
  @JoinTable({
    name: 'groups_users',
    joinColumn: {
      name: 'groups_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'users_id',
      referencedColumnName: 'id',
    },
  })
  users: UserEntity[];
}
