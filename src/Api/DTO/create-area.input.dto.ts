import { Type } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateAddressInputDto } from "./create-address.input.dto";
export class CreateAreaInputDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDecimal()
    @IsNotEmpty()
    rent: number;

    @ValidateNested()
    @IsNotEmpty()
    @Type(()=>CreateAddressInputDto)
    address: CreateAddressInputDto
}
