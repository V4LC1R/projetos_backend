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
import { ActiveStatusEnum } from '@shared/Visibility';

@Entity()
export class Event {
  //typeorm
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int' })
    type: EventTypeEnum

    @Column({ type: 'int' ,default:ActiveStatusEnum.ACTIVE})
    active:ActiveStatusEnum

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Schedule, schedule => schedule.event, {
      cascade: true
    })
    public schedules: Schedule[];

    @ManyToOne(() => Area, (area) => area.events)
    @JoinColumn()
    public area: Area

    @ManyToOne(() => User, (user) => user.events)
    @JoinColumn()
    public owner: User
}