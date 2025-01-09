import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProducerRepository } from '../../persistence/repository/producer.repository';
import { AgricultureControlModule } from '../../agriculture-control.module';
import { FarmRepository } from '../../persistence/repository/farm.repository';
import { ProducerModel } from '../../core/model/producer.model';
import { EDocumentType } from '../../core/enum/producer.enum';
import { randomUUID } from 'crypto';

describe('Create Farm - Test (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let producerRepository: ProducerRepository;
  let farmRepository: FarmRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AgricultureControlModule],
    }).compile();

    app = module.createNestApplication();
    producerRepository = module.get<ProducerRepository>(ProducerRepository);
    farmRepository = module.get<FarmRepository>(FarmRepository);
    await app.init();
  });

  beforeEach(async () => {
    await producerRepository.deleteAll();
    await farmRepository.deleteAll();
  });
  afterAll(async () => await module.close());

  describe('/farms', () => {
    it('should be create a farm', async () => {
      const producerId = randomUUID();
      const producerEntity = new ProducerModel({
        id: producerId,
        name: 'João Santos',
        documentId: '33295457000120',
        documentType: EDocumentType.CNPJ,
      });
      await producerRepository.saveProducer(producerEntity);

      const farmBody = {
        name: 'Fazenda Brasil',
        producerId,
        city: 'Maringá',
        state: 'Paraná',
        totalArea: 7000,
        agriculturalArea: 5000,
        vegetationArea: 2000,
      };

      const expectedResponse = {
        name: 'Fazenda Brasil',
        producerId,
        city: 'Maringá',
        state: 'Paraná',
        totalArea: 7000,
        agriculturalArea: 5000,
        vegetationArea: 2000,
      };

      const response = await request(app.getHttpServer())
        .post('/farms')
        .send(farmBody)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject(expectedResponse);

      expect(response.body.id).toBeDefined();
    });
  });
});
