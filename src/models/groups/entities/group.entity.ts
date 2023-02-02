import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities';
import { TodoEntity } from '../../todos/entities';

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

  @OneToMany(() => TodoEntity, (todo) => todo.group)
  todos: TodoEntity[];

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
