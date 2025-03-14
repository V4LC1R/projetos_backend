import { 
    Entity,
    PrimaryColumn,
    Column, 
    OneToMany
} from 'typeorm';
import { Event } from './event.schema';

@Entity()
export class User {
  //typeorm
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 512 })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    cellphone?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => Event, event => event.owner)
    public events: Event[];
}