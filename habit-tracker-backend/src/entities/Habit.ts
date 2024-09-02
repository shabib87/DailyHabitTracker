// Manages the habits associated with each user.

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tracker } from './Tracker';
import { User } from './User';
import { Reminder } from './Reminder';

@Entity()
export class Habit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => User, (user) => user.habits)
  user!: User;

  @OneToMany(() => Tracker, tracker => tracker.habit)
  trackers!: Tracker[];

  @OneToMany(() => Reminder, reminder => reminder.habit)
  reminders!: Reminder[];
}
