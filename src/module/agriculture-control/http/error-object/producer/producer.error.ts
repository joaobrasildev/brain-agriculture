import { HttpStatus } from '@nestjs/common';
import { CreateProducerResponseDto } from '../../dto/producer/reponse/create-producer-response.dto';
import {
  documentInvalidResponseMessage,
  internalServerErrorResponseMessage,
  producerAlreadyExistsResponseMessage,
} from '@src/module/agriculture-control/core/const/producer.const';

export const createUserSuccessResponse = {
  status: HttpStatus.CREATED,
  type: CreateProducerResponseDto,
};

export const badRequestResponse = {
  status: HttpStatus.BAD_REQUEST,
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'documentType should not be empty',
        'documentType must be one of the following values: CPF, CNPJ',
      ],
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
      error: 'Bad Request',
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
