import { AddressCreateInput } from "@app/Inputs/AddressCreateInput";
import { AddressUpdateInput } from "@app/Inputs/AddressUpdateInput";
import { AddressModel } from "@domain/Models/address.model";
import { AreaModel } from "@domain/Models/area.model";

export class AddressBuilder {
  private number_place: string;
  private district: string;
  private country: string;
  private street: string;
  private city: string;
  private state: string;
  private complement: string;
  private latitude: string;
  private longitude: string;
  private areaId: number;
  private id?: number;
  private area?: AreaModel;

  constructor() {
    // Pode inicializar valores padrão se quiser
    this.number_place = '';
    this.district = '';
    this.country = '';
    this.street = '';
    this.city = '';
    this.state = '';
    this.complement = '';
    this.latitude = '';
    this.longitude = '';
    this.areaId = 0;
  }

  setNumberPlace(number_place: string): AddressBuilder {
    this.number_place = number_place;
    return this;
  }

  setDistrict(district: string): AddressBuilder {
    this.district = district;
    return this;
  }

  setCountry(country: string): AddressBuilder {
    this.country = country;
    return this;
  }

  setStreet(street: string): AddressBuilder {
    this.street = street;
    return this;
  }

  setCity(city: string): AddressBuilder {
    this.city = city;
    return this;
  }

  setState(state: string): AddressBuilder {
    this.state = state;
    return this;
  }

  setComplement(complement: string): AddressBuilder {
    this.complement = complement;
    return this;
  }

  setLatitude(latitude: string): AddressBuilder {
    this.latitude = latitude;
    return this;
  }

  setLongitude(longitude: string): AddressBuilder {
    this.longitude = longitude;
    return this;
  }

  setAreaId(areaId: number): AddressBuilder {
    this.areaId = areaId;
    return this;
  }

  setId(id: number): AddressBuilder {
    this.id = id;
    return this;
  }

  setArea(area: AreaModel): AddressBuilder {
    this.area = area;
    return this;
  }

  build(): AddressModel {
    const address = new AddressModel(
      this.number_place,
      this.district,
      this.country,
      this.street,
      this.city,
      this.state,
      this.complement,
      this.latitude,
      this.longitude,
      this.areaId
    );

    if (this.id !== undefined) {
      address.setId(this.id);
    }

    return address;
  }

  static fill(input: AddressCreateInput | AddressUpdateInput): AddressBuilder {
    return new AddressBuilder()
      .setNumberPlace(input.number_place)
      .setDistrict(input.district)
      .setCountry(input.country)
      .setStreet(input.street)
      .setCity(input.city)
      .setState(input.state)
      .setComplement(input.complement)
      .setLatitude(input.latitude)
      .setLongitude(input.longitude);
  }
}
