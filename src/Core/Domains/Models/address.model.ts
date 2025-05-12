import { AreaModel } from "./area.model"

export class AddressModel {
    id?:number
    country:string
    street:string
    city:string
    state:string
    complement:string
    latitude:string
    longitude:string
    areaId:number
    district:string
    number_place:string

    constructor(
        number_place:string,
        district:string,
        country: string,
        street: string,
        city: string,
        state: string,
        complement: string,
        latitude: string,
        longitude: string,
        area_id:number,
        id?:number
    ) {
        this.number_place = number_place,
        this.district = district;
        this.country = country;
        this.street = street;
        this.city = city;
        this.state = state;
        this.complement = complement;
        this.latitude = latitude;
        this.longitude = longitude;
        this.areaId = area_id;
        this.id = id ?? 0
    }

}