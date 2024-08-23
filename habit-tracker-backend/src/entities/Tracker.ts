import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Habit } from './Habit';

@Entity()
export class Tracker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  date!: Date;

  @Column()
  status!: boolean;

  @ManyToOne(() => User, user => user.trackers)
  user!: User;

  @ManyToOne(() => Habit, habit => habit.trackers)
  habit!: Habit;
}
