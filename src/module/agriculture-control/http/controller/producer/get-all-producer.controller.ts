import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { internalServerErrorResponse } from '../../error-object/producer/producer.error';
import { GetAllProducerService } from '@src/module/agriculture-control/core/service/producer/get-all-producer.service';
import { GetAllProducerResponseDto } from '../../dto/producer/reponse/get-all-producer-response.dto';

@ApiTags('Producers')
@Controller('producers')
export class GetAllProducerController {
  constructor(private readonly getAllProducerService: GetAllProducerService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors()
  @ApiResponse(internalServerErrorResponse)
  async getAllProducer(): Promise<GetAllProducerResponseDto[]> {
    const producers = await this.getAllProducerService.getAll();
    const response = plainToInstance(GetAllProducerResponseDto, producers, {
      excludeExtraneousValues: true,
    });

    return response;
  }
}
