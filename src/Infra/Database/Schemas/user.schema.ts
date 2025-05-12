import { 
    Entity,
    PrimaryGeneratedColumn,
    Column, 
    OneToMany
} from 'typeorm';
import { Event } from './event.schema';
import { Area } from './area.schema';

@Entity()
export class User {
  //typeorm
    @PrimaryGeneratedColumn()
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

    @OneToMany(() => Area, area => area.owner)
    public area: Area[];
}