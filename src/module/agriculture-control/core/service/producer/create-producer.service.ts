import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import {
  ICreateProducerInput,
  ICreateProducerOutput,
} from '../../interface/producer.interface';
import { ProducerModel } from '../../model/producer.model';
import { documentValidator } from '../../helper/document-validator.helper';
import {
  documentInvalidResponseMessage,
  internalServerErrorResponseMessage,
  producerAlreadyExistsResponseMessage,
} from '../../const/producer.const';

@Injectable()
export class CreateProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}
  async create(params: ICreateProducerInput): Promise<ICreateProducerOutput> {
    try {
      const documentIsValid = documentValidator(
        params.documentType,
        params.documentId,
      );
      if (!documentIsValid)
        throw new BadRequestException(documentInvalidResponseMessage);

      const producerExists =
        await this.producerRepository.getProducerByDocumentId(
          params.documentId,
        );
      if (producerExists)
        throw new ConflictException(producerAlreadyExistsResponseMessage);

      const producerModel = new ProducerModel({
        name: params.name,
        documentId: params.documentId,
        documentType: params.documentType,
      });
      const producer =
        await this.producerRepository.saveProducer(producerModel);

      return {
        id: producer.id,
        name: producer.name,
        documentId: producer.documentId,
        documentType: producer.documentType,
        createdAt: producer.createdAt,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      console.log(
        `CREATE_PRODUCER_ERROR::STATUS_CODE=500::USER_NAME=${params.name}`,
      );
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
