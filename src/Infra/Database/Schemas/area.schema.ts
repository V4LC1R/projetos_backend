import { 
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { User } from './user.schema';
import { Event } from './event.schema';

@Entity()
export class Area {
  //typeorm
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'decimal', precision: 10, scale: 3 })
    rent: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn()
    owner: User

    @OneToMany(() => Event, event => event.area)
    public events: Event[];
}