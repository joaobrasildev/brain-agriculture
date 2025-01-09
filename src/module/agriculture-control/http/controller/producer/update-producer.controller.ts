import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  badRequestResponse,
  documentInvalidResponse,
  internalServerErrorResponse,
  producerNotFoundResponse,
  updateUserSuccessResponse,
} from '../../error-object/producer/producer.error';
import { UpdateProducerService } from '@src/module/agriculture-control/core/service/producer/update-producer.service';
import {
  UpdateProducerIdRequestDto,
  UpdateProducerRequestDto,
} from '../../dto/producer/request/update-producer-request.dto';
import { UpdateProducerResponseDto } from '../../dto/producer/reponse/update-producer-response.dto';

@ApiTags('Producers')
@Controller('producers')
export class UpdateProducerController {
  constructor(private readonly updateProducerService: UpdateProducerService) {}
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors()
  @ApiResponse(updateUserSuccessResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(documentInvalidResponse)
  @ApiResponse(producerNotFoundResponse)
  @ApiResponse(internalServerErrorResponse)
  async updateProducer(
    @Param() params: UpdateProducerIdRequestDto,
    @Body() data: UpdateProducerRequestDto,
  ): Promise<UpdateProducerResponseDto> {
    const id = params.id;
    const producer = await this.updateProducerService.update(id, data);
    const response = plainToInstance(UpdateProducerResponseDto, producer, {
      excludeExtraneousValues: true,
    });

    return response;
  }
}
