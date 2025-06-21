// src/area/dto/find-by-coordinates.dto.ts
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindByCoordinatesDto {
  @IsString()
  lat: string;

  @IsString()
  lng: string;

  @Type(() => Number)
  @IsNumber()
  distance: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => {
    try {
      const arr = JSON.parse(value);
      return Array.isArray(arr) ? arr.map(Number) : [];
    } catch {
      return [];
    }
  })
  @IsNumber({}, { each: true })
  categoryId?: number[];
}
