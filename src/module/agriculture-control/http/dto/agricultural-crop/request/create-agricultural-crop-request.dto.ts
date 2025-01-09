import { ApiProperty } from '@nestjs/swagger';
import {
  ECrops,
  ELandUse,
} from '@src/module/agriculture-control/core/enum/crop.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateAgriculturalCropRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  harvest: number;

  @ApiProperty({
    enum: ECrops,
  })
  @IsEnum(ECrops)
  @IsNotEmpty()
  crop: ECrops;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  farmId: string;

  @ApiProperty({
    enum: ELandUse,
  })
  @IsEnum(ELandUse)
  @IsNotEmpty()
  landUse: ELandUse;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  area: number;
}
