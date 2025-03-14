import { 
    Entity,
    PrimaryColumn,
    Column,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { User } from './user.schema';
import { Area } from './area.schema';

enum EnumTypeEvent{
    
}

@Entity()
export class Event {
  //typeorm
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({
        type: "enum",
        enum: EnumTypeEvent,
    })
    type: EnumTypeEvent

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @ManyToOne(() => Area, (area) => area.events)
    public area: Area

    @ManyToOne(() => User, (user) => user.events)
    public owner: User
}