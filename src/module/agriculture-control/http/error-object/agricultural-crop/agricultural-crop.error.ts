import { HttpStatus } from '@nestjs/common';
import {
  farmNotFoundResponseMessage,
  invalidCropAreaResponseMessage,
} from '@src/module/agriculture-control/core/const/agricultural-crop.const';
import { CreateAgriculturalCropResponseDto } from '../../dto/agricultural-crop/response/create-agricultural-crop-response.dto';

export const createAgriculturalCropSuccessResponse = {
  status: HttpStatus.CREATED,
  type: CreateAgriculturalCropResponseDto,
};

export const badRequestResponse = {
  status: HttpStatus.BAD_REQUEST,
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: invalidCropAreaResponseMessage,
      error: 'Bad Request',
    },
  },
};
export const farmNotFoundResponse = {
  status: HttpStatus.NOT_FOUND,
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: farmNotFoundResponseMessage,
      error: 'Not Found',
    },
  },
};
