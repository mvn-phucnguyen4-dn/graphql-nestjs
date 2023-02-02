import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities';
import { GroupEntity } from '../../groups/entities';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @Column({ type: 'int', name: 'group_id', nullable: true })
  groupId: number;

  @CreateDateColumn({ nullable: true, name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  deleteAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => GroupEntity, (group) => group.todos)
  @JoinColumn({ name: 'group_id' })
  group: UserEntity;
}
