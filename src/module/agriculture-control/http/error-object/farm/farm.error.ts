import { HttpStatus } from '@nestjs/common';
import {
  internalServerErrorResponseMessage,
  producerNotFoundResponseMessage,
} from '@src/module/agriculture-control/core/const/producer.const';
import { CreateFarmResponseDto } from '../../dto/farm/response/create-farm-response.dto';

export const createFarmSuccessResponse = {
  status: HttpStatus.CREATED,
  type: CreateFarmResponseDto,
};

export const badRequestResponse = {
  status: HttpStatus.BAD_REQUEST,
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['name should not be empty', 'name must be a string'],
      error: 'Bad Request',
    },
  },
};

export const producerNotFoundResponse = {
  status: HttpStatus.NOT_FOUND,
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: producerNotFoundResponseMessage,
      error: 'Not Found',
    },
  },
};

export const internalServerErrorResponse = {
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  schema: {
    example: {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: internalServerErrorResponseMessage,
      error: 'Internal Server Error',
    },
  },
};
