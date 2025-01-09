import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import {
  internalServerErrorResponseMessage,
  producerNotFoundResponseMessage,
} from '../../const/producer.const';

@Injectable()
export class DeleteProducerService {
  constructor(private readonly producerRepository: ProducerRepository) {}
  async delete(id: string): Promise<void> {
    try {
      const producerExists = await this.producerRepository.getProducerById(id);
      if (!producerExists)
        throw new NotFoundException(producerNotFoundResponseMessage);

      await this.producerRepository.deleteproducerById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.log(`DELETE_PRODUCER_ERROR::STATUS_CODE=500::USER_ID=${id}`);
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
