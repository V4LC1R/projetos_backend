import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Area } from './area.schema';
import { Event } from './event.schema';
import { User } from './user.schema';

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
  RESERVED = 'reserved',
}

@Entity()
export class Schedule {
  //typeorm
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'timestamp'})
    start_time: string;

    @Column({ type: 'timestamp'})
    end_time: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({type:'varchar',default:AvailabilityStatus.UNAVAILABLE})
    status: AvailabilityStatus;

    @ManyToOne(() => Event, event => event.schedules, { nullable: true })
    @JoinColumn({ name: 'eventId' })
    event?: Event;

    @ManyToOne(() => Area, (area) => area.events)
    @JoinColumn()
    public area: Area

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn()
    public guest: User
}