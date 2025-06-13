import { AddressModel } from "@domain/Models/address.model";
import { Address } from "../Schemas/address.schema";
import { Area } from "../Schemas/area.schema";

export class AddressMapper {

  // Converte entidade ORM (Address) para entidade domínio (AddressModel)
  static toDomain(address: Address): AddressModel {

    const domain = new AddressModel(
      address.number_place,
      address.district,
      address.country,
      address.street,
      address.city,
      address.state,
      address.complement,
      address.latitude,
      address.longitude,
      address.area?.id || 0,
    );

    domain.setId(address.id);

    return domain;
  }

  // Converte entidade domínio (AddressModel) para entidade ORM (Address)
  static toORM(domain: AddressModel): Address {

    const orm = new Address();

    orm.id = domain.id;
    orm.number_place = domain.number_place;
    orm.district = domain.district;
    orm.country = domain.country;
    orm.street = domain.street;
    orm.city = domain.city;
    orm.state = domain.state;
    orm.complement = domain.complement;
    orm.latitude = domain.latitude;
    orm.longitude = domain.longitude;

    if(domain.areaId){
      orm.area = {id:domain.areaId} as Area; // ou pode chamar um mapper da Area se tiver
    }

    return orm;
  }
}
