import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Area } from "./area.schema";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    number_place:string

    @Column({ type: 'varchar', length: 255 })
    country:string

    @Column({ type: 'varchar', length: 255 })
    district:string

    @Column({ type: 'varchar', length: 255 })
    street:string

    @Column({ type: 'varchar', length: 255 })
    city:string

    @Column({ type: 'varchar', length: 255 })
    state:string

    @Column({ type:'text'})
    complement:string

    @Column({type:"varchar",length:255})
    latitude:string

    @Column({type:"varchar",length:255})
    longitude:string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => Area, (area) => area.address)
    @JoinColumn()
    area: Area
}