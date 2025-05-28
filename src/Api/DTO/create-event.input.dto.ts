import { IsString, IsNotEmpty, IsEnum, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { EventTypeEnum } from 'src/Core/Domains/Models/event.model';

export class CreateEventInputDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  areaId: number;

  @IsNotEmpty()
  @IsEnum(EventTypeEnum)
  type: EventTypeEnum;
}
