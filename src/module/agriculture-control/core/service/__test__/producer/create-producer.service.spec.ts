import { Test } from '@nestjs/testing';
import { CreateProducerService } from '../../producer/create-producer.service';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import {
  createProducerInputMock,
  createProducerResponseMock,
  createProducerWithInvalidDocumentInputMock,
  getProducerByDocumentIdResponseMock,
} from '../mock/create-producer.mock';
import { BadRequestException, ConflictException } from '@nestjs/common';
import {
  documentInvalidResponseMessage,
  producerAlreadyExistsResponseMessage,
} from '../../../const/producer.const';

describe('CreateProducerService', () => {
  let createProducerService: CreateProducerService;
  let producerRepository: jest.Mocked<ProducerRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            saveProducer: jest.fn(),
            getProducerByDocumentId: jest.fn(),
          },
        },
      ],
    }).compile();

    createProducerService = moduleRef.get<CreateProducerService>(
      CreateProducerService,
    );
    producerRepository = moduleRef.get(ProducerRepository);
  });

  it('to be defined', () => {
    expect(createProducerService).toBeDefined();
    expect(producerRepository).toBeDefined();
  });

  it('should be create producer', async () => {
    producerRepository.getProducerByDocumentId.mockResolvedValue(undefined);
    producerRepository.saveProducer.mockResolvedValue(
      createProducerResponseMock,
    );

    await createProducerService.create(createProducerInputMock);

    expect(producerRepository.getProducerByDocumentId).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerByDocumentId).toHaveBeenCalledWith(
      createProducerInputMock.documentId,
    );
    expect(producerRepository.saveProducer).toHaveBeenCalledTimes(1);
  });

  it('Should not be create producer and return already exists error', async () => {
    producerRepository.getProducerByDocumentId.mockResolvedValue(
      getProducerByDocumentIdResponseMock,
    );

    await expect(
      createProducerService.create(createProducerInputMock),
    ).rejects.toEqual(
      new ConflictException(producerAlreadyExistsResponseMessage),
    );
    expect(producerRepository.getProducerByDocumentId).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerByDocumentId).toHaveBeenCalledWith(
      createProducerInputMock.documentId,
    );
    expect(producerRepository.saveProducer).toHaveBeenCalledTimes(0);
  });

  it('Should not be create producer and return invalid document error', async () => {
    await expect(
      createProducerService.create(createProducerWithInvalidDocumentInputMock),
    ).rejects.toEqual(new BadRequestException(documentInvalidResponseMessage));
    expect(producerRepository.getProducerByDocumentId).toHaveBeenCalledTimes(0);
    expect(producerRepository.saveProducer).toHaveBeenCalledTimes(0);
  });
});
