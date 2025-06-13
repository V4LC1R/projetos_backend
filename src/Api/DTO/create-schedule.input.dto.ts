import { IsNotEmpty, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateScheduleInputDto {
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    date: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    start_time: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    end_time: Date;
}
