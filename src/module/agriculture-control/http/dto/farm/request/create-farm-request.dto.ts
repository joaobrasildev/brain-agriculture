import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateFarmRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  totalArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  agriculturalArea: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vegetationArea: number;
}
