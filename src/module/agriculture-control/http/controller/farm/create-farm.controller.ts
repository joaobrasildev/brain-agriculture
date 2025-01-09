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

import { CreateFarmService } from '@src/module/agriculture-control/core/service/farm/create-farm.service';
import { CreateFarmRequestDto } from '../../dto/farm/request/create-farm-request.dto';
import { CreateFarmResponseDto } from '../../dto/farm/response/create-farm-response.dto';
import {
  badRequestResponse,
  createFarmSuccessResponse,
  internalServerErrorResponse,
  producerNotFoundResponse,
} from '../../error-object/farm/farm.error';

@ApiTags('Farms')
@Controller('farms')
export class CreateFarmController {
  constructor(private readonly createFarmService: CreateFarmService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors()
  @ApiResponse(createFarmSuccessResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(producerNotFoundResponse)
  @ApiResponse(internalServerErrorResponse)
  async createFarm(
    @Body() data: CreateFarmRequestDto,
  ): Promise<CreateFarmResponseDto> {
    const farm = await this.createFarmService.create(data);
    const response = plainToInstance(CreateFarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });

    return response;
  }
}
