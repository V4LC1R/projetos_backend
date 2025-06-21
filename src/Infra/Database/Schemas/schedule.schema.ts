import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    OneToMany,
    OneToOne,
    ManyToOne,
    JoinColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { Area } from './area.schema';
import { Event } from './event.schema';
import { User } from './user.schema';
import { AvailabilityStatus } from '@domain/Models/schedule.model';
import { ActiveStatusEnum } from '@shared/Visibility';
import { Request } from './request.schema';

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

    @Column({type:'varchar',default:AvailabilityStatus.AVAILABLE})
    status: AvailabilityStatus;

    @Column({ type: 'int' ,default:ActiveStatusEnum.ACTIVE})
    active:ActiveStatusEnum

    @ManyToOne(() => Event, event => event.schedules, { nullable: true })
    @JoinColumn({ name: 'eventId' })
    event?: Event;

    @ManyToMany(() => Request, request => request.schedules)
    public requests?: Request[];

    @ManyToOne(() => Area, (area) => area.events)
    @JoinColumn()
    public area: Area

}