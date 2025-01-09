import { Test } from '@nestjs/testing';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import { getProducerByIdResponseMock } from '../mock/update-producer.mock';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { producerNotFoundResponseMessage } from '../../../const/producer.const';
import { DeleteProducerService } from '../../producer/delete-producer.service';

describe('DeleteProducerService', () => {
  let deleteProducerService: DeleteProducerService;
  let producerRepository: jest.Mocked<ProducerRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            deleteproducerById: jest.fn(),
            getProducerById: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteProducerService = moduleRef.get<DeleteProducerService>(
      DeleteProducerService,
    );
    producerRepository = moduleRef.get(ProducerRepository);
  });

  it('to be defined', () => {
    expect(deleteProducerService).toBeDefined();
    expect(producerRepository).toBeDefined();
  });

  it('should be delete producer', async () => {
    const id = randomUUID();
    producerRepository.getProducerById.mockResolvedValue(
      getProducerByIdResponseMock,
    );
    producerRepository.deleteproducerById.mockResolvedValue();

    await deleteProducerService.delete(id);

    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(id);
    expect(producerRepository.deleteproducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.deleteproducerById).toHaveBeenCalledWith(id);
  });

  it('Should not be delete producer and return not found error', async () => {
    const id = randomUUID();
    producerRepository.getProducerById.mockResolvedValue(undefined);

    await expect(deleteProducerService.delete(id)).rejects.toEqual(
      new NotFoundException(producerNotFoundResponseMessage),
    );
    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(id);
    expect(producerRepository.deleteproducerById).toHaveBeenCalledTimes(0);
  });
});
