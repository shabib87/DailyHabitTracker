// Logs the progress of habits.

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Habit } from './Habit';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'datetime' })
  date!: Date;

  @Column()
  status!: boolean;

  @ManyToOne(() => Habit, (habit) => habit.trackers)
  habit!: Habit;
}
