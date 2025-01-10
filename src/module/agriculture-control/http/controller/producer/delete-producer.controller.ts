import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  deleteProducerSuccessResponse,
  internalServerErrorResponse,
  producerNotFoundResponse,
} from '../../error-object/producer/producer.error';
import { DeleteProducerService } from '@src/module/agriculture-control/core/service/producer/delete-producer.service';
import { DeleteProducerIdRequestDto } from '../../dto/producer/request/delete-producer-request.dto';

@ApiTags('Producers')
@Controller('producers')
export class DeleteProducerController {
  constructor(private readonly deleteProducerService: DeleteProducerService) {}
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors()
  @ApiResponse(producerNotFoundResponse)
  @ApiResponse(internalServerErrorResponse)
  @ApiResponse(deleteProducerSuccessResponse)
  async deleteProducer(@Param() params: DeleteProducerIdRequestDto) {
    const id = params.id;

    return await this.deleteProducerService.delete(id);
  }
}
