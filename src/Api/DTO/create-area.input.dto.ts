import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDecimal, IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateAddressInputDto } from "./create-address.input.dto";
import { CreateScheduleInputDto } from "./create-schedule.input.dto";
export class CreateAreaInputDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDecimal()
    @IsNotEmpty()
    rent: number;

    @IsArray({ message: 'Os agendamentos devem ser fornecidos como um array' })
    @ArrayMinSize(1, { message: 'Deve haver pelo menos um agendamento' })
    @IsInt({ each: true, message: 'Cada agendamento deve ser um número inteiro' })
    @Type(() => Number)
    categories: number[]; 

    @ValidateNested()
    @IsNotEmpty()
    @Type(()=>CreateAddressInputDto)
    address: CreateAddressInputDto

    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(()=>CreateScheduleInputDto)
    schedule:CreateScheduleInputDto[]
}
