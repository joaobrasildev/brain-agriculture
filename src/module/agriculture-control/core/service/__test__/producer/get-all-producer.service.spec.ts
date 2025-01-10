import { Test } from '@nestjs/testing';
import { ProducerRepository } from '@src/module/agriculture-control/persistence/repository/producer.repository';
import { GetAllProducerService } from '../../producer/get-all-producer.service';
import { getAllProducerResponseMock } from '../mock/get-all-producer.mock';

describe('GetAllProducerService', () => {
  let getAllProducerService: GetAllProducerService;
  let producerRepository: jest.Mocked<ProducerRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetAllProducerService,
        {
          provide: ProducerRepository,
          useValue: {
            getAllProducer: jest.fn(),
          },
        },
      ],
    }).compile();

    getAllProducerService = moduleRef.get<GetAllProducerService>(
      GetAllProducerService,
    );
    producerRepository = moduleRef.get(ProducerRepository);
  });

  it('to be defined', () => {
    expect(getAllProducerService).toBeDefined();
    expect(producerRepository).toBeDefined();
  });

  it('should be list producers', async () => {
    producerRepository.getAllProducer.mockResolvedValue(
      getAllProducerResponseMock,
    );

    await getAllProducerService.getAll();

    expect(producerRepository.getAllProducer).toHaveBeenCalledTimes(1);
    expect(producerRepository.getAllProducer).toHaveBeenCalledWith();
  });
});
