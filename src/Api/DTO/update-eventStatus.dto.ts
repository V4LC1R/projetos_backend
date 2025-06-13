import { AvailabilityStatus } from "@domain/Models/schedule.model";
import { IsEnum, IsNotEmpty,NotContains } from "class-validator";

export class UpdateEventStatusInputDTO  {
    @IsNotEmpty()
    @IsEnum(AvailabilityStatus)
    type: AvailabilityStatus;
}