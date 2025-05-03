import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    OneToMany,
    OneToOne,
    ManyToOne
} from 'typeorm';

import { Area } from './area.schema';

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

    @Column({ type: 'time with time zone'})
    start_time: string;

    @Column({ type: 'time with time zone' })
    end_time: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({
        type: 'enum',
        enum: AvailabilityStatus,
        default: AvailabilityStatus.AVAILABLE,
    })
    status: AvailabilityStatus;

    @ManyToOne(() => Area, (area) => area.events)
    public area: Area
}