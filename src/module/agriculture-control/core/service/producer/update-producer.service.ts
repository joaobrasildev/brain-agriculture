import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import {
  IUpdateProducerInput,
  IUpdateProducerOutput,
} from '../../interface/producer.interface';
import { ProducerModel } from '../../model/producer.model';
import {
  internalServerErrorResponseMessage,
  producerNotFoundResponseMessage,
} from '../../const/producer.const';

@Injectable()
export class UpdateProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}
  async update(
    id: string,
    params: IUpdateProducerInput,
  ): Promise<IUpdateProducerOutput> {
    try {
      const producerExists = await this.producerRepository.getProducerById(id);
      if (!producerExists)
        throw new NotFoundException(producerNotFoundResponseMessage);

      const producerModel = new ProducerModel({
        id,
        name: params.name ?? producerExists.name,
        documentId: producerExists.documentId,
        documentType: producerExists.documentType,
      });
      const producer =
        await this.producerRepository.updateProducer(producerModel);

      return {
        id: producer.id,
        name: producer.name,
        documentId: producer.documentId,
        documentType: producer.documentType,
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.log(`UPDATE_PRODUCER_ERROR::STATUS_CODE=500::USER_ID=${id}`);
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
