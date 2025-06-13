import { Schedule } from './schedule.schema';
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne
} from 'typeorm';
import { User } from './user.schema';
import { Event } from './event.schema';
import { Address } from './address.schema';
import { ActiveStatusEnum } from '@shared/Visibility';

@Entity()
export class Area {
  //typeorm
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    rent: number;

    @Column({ type: 'int' ,default:ActiveStatusEnum.ACTIVE})
    active:ActiveStatusEnum

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.area)
    owner: User

    @OneToOne(() => Address, (address) => address.area)
    public address: Address

    @OneToMany(() => Event, event => event.area,{ eager: true })
    public events: Event[];

    @OneToMany(() => Schedule, event => event.area,{ eager: true })
    public schedule: Schedule[];
}