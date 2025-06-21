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

    @Column({ type: 'decimal', precision: 10, scale: 8 })
    latitude: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    longitude: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => Area, (area) => area.address)
    @JoinColumn()
    area: Area
}