// Manages reminders for habit tracking.

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Habit } from './Habit';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Habit, (habit) => habit.reminders)
  @JoinColumn({ name: 'habitId' })
  habit!: Habit;

  @Column({ type: 'datetime' })
  reminderTime!: Date;

  @Column({ type: 'text', nullable: true })
  message!: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;
}
