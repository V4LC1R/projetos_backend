import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { User } from './user.schema';
import { Area } from './area.schema';
import { EventTypeEnum } from 'src/Core/Domains/Models/event.model';
import { Schedule } from './schedule.schema';

@Entity()
export class Event {
  //typeorm
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int' })
    type: EventTypeEnum

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Schedule, schedule => schedule.event, {
      cascade: true,
      eager: false,
    })
    public schedules: Schedule[];

    @ManyToOne(() => Area, (area) => area.events)
    @JoinColumn()
    public area: Area

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn()
    public owner: User
}