import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateProducerRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateProducerIdRequestDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
