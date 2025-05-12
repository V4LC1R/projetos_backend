import { AddressModel } from "src/Core/Domains/Models/address.model"

export class AddressCreateOutput {
    id:number
    number_place:string
    district:string
    country:string
    street:string
    city:string
    state:string
    complement:string
    latitude:string
    longitude:string
    area_id: number;

    constructor(
        {
            id,
            number_place,
            district,
            country,
            street,
            city,
            state,
            complement,
            latitude,
            longitude,
            areaId
        }: AddressModel
    ) {
        this.id = id ?? 0;
        this.number_place = number_place;
        this.district = district;
        this.country = country;
        this.street = street;
        this.city = city;
        this.state = state;
        this.complement = complement;
        this.latitude = latitude;
        this.longitude = longitude;
        this.area_id = areaId;
    }
}