import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProducerRepository } from '../../persistence/repository/producer.repository';
import { AgricultureControlModule } from '../../agriculture-control.module';
import { ProducerModel } from '../../core/model/producer.model';
import { EDocumentType } from '../../core/enum/producer.enum';

describe('Get All Producer - Test (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let producerRepository: ProducerRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AgricultureControlModule],
    }).compile();

    app = module.createNestApplication();
    producerRepository = module.get<ProducerRepository>(ProducerRepository);
    await app.init();
  });

  beforeEach(async () => {
    await producerRepository.deleteAll();
  });
  afterAll(async () => await module.close());

  describe('/producers', () => {
    it('should be get all producers', async () => {
      const producerEntity = new ProducerModel({
        name: 'João Santos',
        documentId: '33295457000120',
        documentType: EDocumentType.CNPJ,
      });

      await producerRepository.saveProducer(producerEntity);

      const expectedResponse = [
        {
          name: 'João Santos',
          documentId: '33295457000120',
          documentType: EDocumentType.CNPJ,
        },
      ];

      const response = await request(app.getHttpServer())
        .get(`/producers`)
        .expect(HttpStatus.OK);

      expect(response.body).toMatchObject(expectedResponse);
    });
  });
});
