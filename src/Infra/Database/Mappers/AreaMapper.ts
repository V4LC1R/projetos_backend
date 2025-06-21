import { AreaModel } from "@domain/Models/area.model";
import { AddressMapper } from "./AddressMapper";
import { Area } from "../Schemas/area.schema";
import { ScheduleMapper } from "./ScheduleMapper";
import { User } from "../Schemas/user.schema";
import { CategoryMapper } from "./CategoryMapper";

export class AreaMapper {

  static toDomain(area: Area): AreaModel {
    const domain = new AreaModel(
      area.name,
      area.rent,    // rent é decimal, converte para number
      area.createdAt,
      area.updatedAt,
    );

    domain.setId(area.id);

    if (area.owner) {
      domain.setOwner(area.owner.id);
    }

    if(area.categories && area.categories.length > 0)
      domain.setCategories(area.categories.map(c=>CategoryMapper.toDomain(c)))

    if (area.address) {
      domain.setAddress(AddressMapper.toDomain(area.address));
    }

    if (area.schedule) {
      domain.setSchedule(area.schedule.map(s => ScheduleMapper.toDomain(s)));
    }

    return domain;
  }

  static toORM(domain: AreaModel): Area {

    const orm = new Area();

    

    orm.id = domain.id;
    orm.name = domain.name;
    orm.rent = domain.rent;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;

    if(domain.categories && domain.categories.length > 0)
      orm.categories = domain.categories.map(c=>CategoryMapper.toORM(c))

    if (domain.ownerId) {
      orm.owner = {id:domain.ownerId} as User;
    }

    if (domain.address) {
      orm.address = AddressMapper.toORM(domain.address);
    }

    if (domain.schedule) {
      orm.schedule = domain.schedule.map(s => ScheduleMapper.toORM(s));
    }

    return orm;
  }
}
