import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateFarmResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  producerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  state: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  totalArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  agriculturalArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  vegetationArea: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt: Date;
}
