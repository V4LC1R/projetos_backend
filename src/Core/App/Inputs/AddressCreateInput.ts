export class AddressCreateInput {
    number_place:string
    district:string
    country:string
    street:string
    city:string
    state:string
    complement:string
    latitude:string
    longitude:string

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
    ) {
        this.number_place = number_place;
        this.district = district;
        this.country = country;
        this.street = street;
        this.city = city;
        this.state = state;
        this.complement = complement;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}