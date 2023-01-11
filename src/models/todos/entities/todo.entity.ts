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

  @CreateDateColumn({ nullable: true, name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ nullable: true, name: 'update_at' })
  updateAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'delete_at' })
  deleteAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
