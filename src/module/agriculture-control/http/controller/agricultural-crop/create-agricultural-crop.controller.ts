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

import { internalServerErrorResponse } from '../../error-object/farm/farm.error';
import { CreateAgriculturalCropService } from '@src/module/agriculture-control/core/service/agricultural-crop/create-agricultural-crop.service';
import {
  badRequestResponse,
  createAgriculturalCropSuccessResponse,
  farmNotFoundResponse,
} from '../../error-object/agricultural-crop/agricultural-crop.error';
import { CreateAgriculturalCropResponseDto } from '../../dto/agricultural-crop/response/create-agricultural-crop-response.dto';
import { CreateAgriculturalCropRequestDto } from '../../dto/agricultural-crop/request/create-agricultural-crop-request.dto';

@ApiTags('Agricultural Crops')
@Controller('agricultural-crops')
export class CreateAgriculturalCropController {
  constructor(
    private readonly createAgriculturalCropService: CreateAgriculturalCropService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors()
  @ApiResponse(createAgriculturalCropSuccessResponse)
  @ApiResponse(badRequestResponse)
  @ApiResponse(farmNotFoundResponse)
  @ApiResponse(internalServerErrorResponse)
  async createFarm(
    @Body() data: CreateAgriculturalCropRequestDto,
  ): Promise<CreateAgriculturalCropResponseDto> {
    const agriculturalCrop =
      await this.createAgriculturalCropService.create(data);
    const response = plainToInstance(
      CreateAgriculturalCropResponseDto,
      agriculturalCrop,
      {
        excludeExtraneousValues: true,
      },
    );

    return response;
  }
}
