import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Habit } from './Habit';
import { Tracker } from './Tracker';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Habit, (habit) => habit.user)
  habits!: Habit[];

  @OneToMany(() => Tracker, tracker => tracker.user)
  trackers!: Tracker[];
}
