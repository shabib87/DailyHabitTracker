import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tracker } from './Tracker';
import { User } from './User';

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
}
