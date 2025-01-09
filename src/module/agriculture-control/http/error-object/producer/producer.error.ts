import { HttpStatus } from '@nestjs/common';
import { CreateProducerResponseDto } from '../../dto/producer/reponse/create-producer-response.dto';
import {
  documentInvalidResponseMessage,
  internalServerErrorResponseMessage,
  producerAlreadyExistsResponseMessage,
  producerNotFoundResponseMessage,
} from '@src/module/agriculture-control/core/const/producer.const';
import { UpdateProducerResponseDto } from '../../dto/producer/reponse/update-producer-response.dto';

export const createUserSuccessResponse = {
  status: HttpStatus.CREATED,
  type: CreateProducerResponseDto,
};

export const updateUserSuccessResponse = {
  status: HttpStatus.OK,
  type: UpdateProducerResponseDto,
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

export const documentInvalidResponse = {
  status: HttpStatus.BAD_REQUEST,
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: documentInvalidResponseMessage,
      error: 'Bad Request',
    },
  },
};

export const producerAlreadyExistsResponse = {
  status: HttpStatus.CONFLICT,
  schema: {
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: producerAlreadyExistsResponseMessage,
      error: 'Conflict',
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
