import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import { internalServerErrorResponseMessage } from '../../const/producer.const';
import { IGetAllProducerOutput } from '../../interface/producer.interface';

@Injectable()
export class GetAllProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}
  async getAll(): Promise<IGetAllProducerOutput[]> {
    try {
      const producers = await this.producerRepository.getAllProducer();

      return producers.map((producer) => ({
        id: producer.id,
        name: producer.name,
        documentId: producer.documentId,
        documentType: producer.documentType,
        createdAt: producer.createdAt,
        updatedAt: producer.updatedAt,
      }));
    } catch (error) {
      console.log(error);
      console.log(`GET_ALL_PRODUCERS_ERROR::STATUS_CODE=500`);
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
