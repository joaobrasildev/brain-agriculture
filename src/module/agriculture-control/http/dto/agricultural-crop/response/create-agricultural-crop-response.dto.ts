import { ApiProperty } from '@nestjs/swagger';
import {
  ECrops,
  ELandUse,
} from '@src/module/agriculture-control/core/enum/crop.enum';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAgriculturalCropResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  harvest: string;

  @ApiProperty({
    enum: ECrops,
  })
  @IsEnum(ECrops)
  @IsNotEmpty()
  @Expose()
  crop: ECrops;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  farmId: string;

  @ApiProperty({
    enum: ELandUse,
  })
  @IsEnum(ELandUse)
  @IsNotEmpty()
  @Expose()
  landUse: ELandUse;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Expose()
  area: number;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  @Expose()
  createdAt: Date;
}
