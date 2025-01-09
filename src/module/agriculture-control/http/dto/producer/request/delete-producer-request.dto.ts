import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProducerIdRequestDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
