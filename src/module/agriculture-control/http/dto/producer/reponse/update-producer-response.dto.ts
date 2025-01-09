import { ApiProperty } from '@nestjs/swagger';
import { EDocumentType } from '@src/module/agriculture-control/core/enum/producer.enum';
import { Expose } from 'class-transformer';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProducerResponseDto {
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
  @IsString()
  @IsNotEmpty()
  @Expose()
  documentId: string;

  @ApiProperty({
    enum: EDocumentType,
  })
  @IsEnum(EDocumentType)
  @IsNotEmpty()
  @Expose()
  documentType: EDocumentType;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  updatedAt: Date;
}
