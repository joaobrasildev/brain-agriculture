import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProducerRequestDto } from '../../dto/producer/request/create-producer-request.dto';
import { CreateProducerResponseDto } from '../../dto/producer/reponse/create-producer-response.dto';
import { CreateProducerService } from '@src/module/agriculture-control/core/service/producer/create-producer.service';
import {
  badRequestResponse,
  createUserSuccessResponse,
  documentInvalidResponse,
  internalServerErrorResponse,
  producerAlreadyExistsResponse,
} from '../../error-object/producer/producer.error';

@ApiTags('Producers')
@Controller('producers')
export class CreateProcessController {
  constructor(private readonly createProducerService: CreateProducerService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors()
  @ApiResponse(createUserSuccessResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(documentInvalidResponse)
  @ApiResponse(producerAlreadyExistsResponse)
  @ApiResponse(internalServerErrorResponse)
  async paymentProcess(
    @Body() data: CreateProducerRequestDto,
  ): Promise<CreateProducerResponseDto> {
    const producer = await this.createProducerService.create(data);
    const response = plainToInstance(CreateProducerResponseDto, producer, {
      excludeExtraneousValues: true,
    });

    return response;
  }
}
