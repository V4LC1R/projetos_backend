import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { User } from './user.schema';
import { Area } from './area.schema';
import { Schedule } from './schedule.schema';
import { ActiveStatusEnum } from '@shared/Visibility';

@Entity()
export class Request {
  //typeorm
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    message: string;

    @Column({ type: 'int' ,default:ActiveStatusEnum.ACTIVE})
    active:ActiveStatusEnum

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToMany(() => Schedule, schedule => schedule.requests, {
      cascade: true,
      eager: false,
    })
    @JoinTable({
      name: "request_schedule",
      joinColumn: { name: "request_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "schedule_id", referencedColumnName: "id" },
    })
    public schedules: Schedule[];

    @ManyToOne(() => Area, (area) => area.requests)
    @JoinColumn()
    public area: Area

    @ManyToOne(() => User, (user) => user.requests)
    @JoinColumn()
    public owner: User
}