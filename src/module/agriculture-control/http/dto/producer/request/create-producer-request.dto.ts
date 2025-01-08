import { ApiProperty } from '@nestjs/swagger';
import { EDocumentType } from '@src/module/agriculture-control/core/enum/producer.enum';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  documentId: string;

  @ApiProperty({
    enum: EDocumentType,
  })
  @IsEnum(EDocumentType)
  @IsNotEmpty()
  documentType: EDocumentType;
}
