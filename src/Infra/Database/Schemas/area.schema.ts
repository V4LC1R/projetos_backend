import { Schedule } from './schedule.schema';
import { 
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';
import { User } from './user.schema';
import { Event } from './event.schema';
import { Address } from './address.schema';
import { ActiveStatusEnum } from '@shared/Visibility';
import { Category } from './category.schema';
import { Request } from './request.schema';

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

    @OneToMany(() => Event, event => event.area)
    public events: Event[];

    @OneToMany(() => Schedule, event => event.area)
    public schedule: Schedule[];

    @OneToMany(() => Request, request => request.area)
    public requests: Request[];

    @ManyToMany(() => Category, (category) => category.areas, { eager: true })
    @JoinTable({
      name: "area_category",
      joinColumn: { name: "area_id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "category_id", referencedColumnName: "id" },
    })
    public categories: Category[];
}