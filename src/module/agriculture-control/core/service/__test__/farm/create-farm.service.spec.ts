import { Test } from '@nestjs/testing';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { producerNotFoundResponseMessage } from '../../../const/producer.const';
import { CreateFarmService } from '../../farm/create-farm.service';
import { FarmRepository } from '@src/module/agriculture-control/persistence/repository/farm.repository';
import {
  createFarmInputMock,
  createFarmResponseMock,
  getProducerByIdResponseMock,
} from '../mock/create-farm.mock';
import { invalidAreaResponseMessage } from '../../../const/farm.const';

describe('CreateFarmService', () => {
  let createFarmService: CreateFarmService;
  let producerRepository: jest.Mocked<ProducerRepository>;
  let farmRepository: jest.Mocked<FarmRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateFarmService,
        {
          provide: ProducerRepository,
          useValue: {
            getProducerById: jest.fn(),
          },
        },
        {
          provide: FarmRepository,
          useValue: {
            saveFarm: jest.fn(),
          },
        },
      ],
    }).compile();

    createFarmService = moduleRef.get<CreateFarmService>(CreateFarmService);
    producerRepository = moduleRef.get(ProducerRepository);
    farmRepository = moduleRef.get(FarmRepository);
  });

  it('to be defined', () => {
    expect(createFarmService).toBeDefined();
    expect(producerRepository).toBeDefined();
    expect(farmRepository).toBeDefined();
  });

  it('should be create farm', async () => {
    producerRepository.getProducerById.mockResolvedValue(
      getProducerByIdResponseMock,
    );
    farmRepository.saveFarm.mockResolvedValue(createFarmResponseMock);

    await createFarmService.create(createFarmInputMock);

    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(
      createFarmInputMock.producerId,
    );
    expect(farmRepository.saveFarm).toHaveBeenCalledTimes(1);
  });

  it('Should not be create farm and return producer not found error', async () => {
    producerRepository.getProducerById.mockResolvedValue(undefined);

    await expect(createFarmService.create(createFarmInputMock)).rejects.toEqual(
      new NotFoundException(producerNotFoundResponseMessage),
    );
    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(1);
    expect(producerRepository.getProducerById).toHaveBeenCalledWith(
      createFarmInputMock.producerId,
    );
    expect(farmRepository.saveFarm).toHaveBeenCalledTimes(0);
  });

  it('Should not be create farm and return invalid area error', async () => {
    await expect(
      createFarmService.create({ ...createFarmInputMock, totalArea: 1000 }),
    ).rejects.toEqual(new BadRequestException(invalidAreaResponseMessage));
    expect(producerRepository.getProducerById).toHaveBeenCalledTimes(0);
    expect(farmRepository.saveFarm).toHaveBeenCalledTimes(0);
  });
});
