// TODO make this works
// import { Task as DomainTask } from '@packages/domain';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @Column()
  isGeneratedByAI!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
