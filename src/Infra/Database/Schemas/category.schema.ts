import { Area } from 'src/Infra/Database/Schemas/area.schema';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Area, (area) => area.categories)
  public areas: Area[];
}
