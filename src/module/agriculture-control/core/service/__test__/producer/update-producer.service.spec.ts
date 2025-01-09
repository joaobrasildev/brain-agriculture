import { Test } from '@nestjs/testing';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import { UpdateProducerService } from '../../producer/update-producer.service';
import {
  getProducerByIdResponseMock,
  updateProducerInputMock,
  updateProducerResponseMock,
} from '../mock/update-producer.mock';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { producerNotFoundResponseMessage } from '../../../const/producer.const';

describe('UpdateProducerService', () => {
  let updateProducerService: UpdateProducerService;
  let producerRepository: jest.Mocked<ProducerRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            updateProducer: jest.fn(),
            getProducerById: jest.fn(),
          },
        },
      ],
    }).compile();

    updateProducerService = moduleRef.get<UpdateProducerService>(
      UpdateProducerService,
    );
    producerRepository = moduleRef.get(ProducerRepository);
  });

  it('to be defined', () => {
    expect(updateProducerService).toBeDefined();
    expect(producerRepository).toBeDefined();
  });

  it('should be update producer', async () => {
    const id = randomUUID();
    producerRepository.getProducerById.mockResolvedValue(
      getProducerByIdResponseMock,
    );
    producerRepository.updateProducer.mockResolvedValue(
      updateProducerResponseMock,
    );

    await updateProducerService.update(id, updateProducerInputMock);

    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(id);
    expect(producerRepository.updateProducer).toHaveBeenCalledTimes(1);
  });

  it('Should not be update producer and return not found error', async () => {
    const id = randomUUID();
    producerRepository.getProducerById.mockResolvedValue(undefined);

    await expect(
      updateProducerService.update(id, updateProducerInputMock),
    ).rejects.toEqual(new NotFoundException(producerNotFoundResponseMessage));
    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(id);
    expect(producerRepository.updateProducer).toHaveBeenCalledTimes(0);
  });
});
