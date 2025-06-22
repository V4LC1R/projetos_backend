import { IsString, IsNotEmpty, IsEnum, IsInt, IsArray, IsIn, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { EventTypeEnum } from 'src/Core/Domains/Models/event.model';

export class CreateRequestInputDTO {
  @IsString()
  @IsNotEmpty()
  message: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  areaId: number;

  @IsArray({ message: 'Os agendamentos devem ser fornecidos como um array' })
  @ArrayMinSize(1, { message: 'Deve haver pelo menos um agendamento' })
  @IsInt({ each: true, message: 'Cada agendamento deve ser um número inteiro' })
  @Type(() => Number)
  schedules: number[]; 
}
