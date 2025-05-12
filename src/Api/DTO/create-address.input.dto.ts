import { IsNotEmpty, IsString } from "class-validator";
export class CreateAddressInputDto {

    @IsString()
    @IsNotEmpty()
    country:string

    @IsString()
    @IsNotEmpty()
    street:string

    @IsString()
    @IsNotEmpty()
    city:string

    @IsString()
    @IsNotEmpty()
    state:string

    @IsString()
    @IsNotEmpty()
    complement:string

    @IsString()
    @IsNotEmpty()
    latitude:string

    @IsString()
    @IsNotEmpty()
    longitude:string

    @IsString()
    @IsNotEmpty()
    number_place:string

    @IsString()
    @IsNotEmpty()
    district:string
}
