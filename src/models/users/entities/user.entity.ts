import { TodoEntity } from '../../todos/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { GroupEntity } from '../../groups/entities/group.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', name: 'username' })
  username: string;

  @Column({ type: 'text', name: 'hash' })
  hash: string;

  @Column({ type: 'int', name: 'group_id', nullable: true })
  groupId: number;

  @CreateDateColumn({ nullable: true, name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  deleteAt: Date;

  @OneToMany(() => TodoEntity, (todo) => todo.user)
  todos: TodoEntity[];

  @ManyToMany(() => GroupEntity, (group) => group.users)
  groups: [GroupEntity];

  @BeforeInsert()
  @BeforeUpdate()
  async hashpassword() {
    this.hash = await bcrypt.hash(this.hash, 12);
  }
}
