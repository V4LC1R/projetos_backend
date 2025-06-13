import { Type } from "class-transformer";
import { IsDecimal, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { UpdateAddressInputDto } from "./update-address.input.dto";
export class UpdateAreaInputDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDecimal()
    @IsNotEmpty()
    rent: number;

    @ValidateNested()
    @IsNotEmpty()
    @Type(()=>UpdateAddressInputDto)
    address: UpdateAddressInputDto
}
