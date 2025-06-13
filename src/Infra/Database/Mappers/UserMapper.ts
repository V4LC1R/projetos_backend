import { UserModel } from "@domain/Models/user.model";
import { User } from "../Schemas/user.schema";
import { OwnerModel } from "@domain/Models/owner.model";
import { AreaMapper } from "./AreaMapper";
import { GuestModel } from "@domain/Models/guest.model";
import { EventMapper } from "./EventMapper";

export class UserMapper {

  // Infra => Domínio

  static toUserDomain(user: User): UserModel {

    return new UserModel(user.name, user.email, "", user.id, user.cellphone);
  }

  static toOwnerDomain(user: User): OwnerModel {

    const owner = new OwnerModel(user.name, user.email, "", user.id, user.cellphone);
    owner.areas = user.area ? user.area.map(a => AreaMapper.toDomain(a)) : [];
    return owner;
  }

  static toGuestDomain(user: User): GuestModel {

    const guest = new GuestModel(user.name, user.email, "", user.id, user.cellphone);
    guest.events = user.events ? user.events.map(e => EventMapper.toDomain(e)) : [];
    return guest;
  }

  // Domínio => Infra

  static toUserORM(domain: UserModel): User {

    const user = new User();

    user.name = domain.name;
    user.email = domain.email;
    user.password = domain.password;
    user.cellphone = domain.cellphone;

    user.area = [];
    user.events = [];

    return user;
  }

  static toOwnerORM(domain: OwnerModel): User {

    const user = this.toUserORM(domain);

    user.area = domain.areas ? domain.areas.map(a => AreaMapper.toORM(a)) : [];
    user.events = [];

    return user;
  }

  static toGuestORM(domain: GuestModel): User {

    const user = this.toUserORM(domain);

    user.events = domain.events ? domain.events.map(e =>EventMapper.toORM(e)) : [];
    user.area = [];

    return user;
  }
}
