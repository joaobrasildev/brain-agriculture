import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProducerRepository } from '../../persistence/repository/producer.repository';
import { AgricultureControlModule } from '../../agriculture-control.module';

describe('Create Producer - Test (e2e)', () => {
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
    it('should be create a producer', async () => {
      const producerBody = {
        name: 'João Santos',
        documentId: '33295457000120',
        documentType: 'CNPJ',
      };

      const expectedResponse = {
        name: 'João Santos',
        documentId: '33295457000120',
        documentType: 'CNPJ',
      };

      const response = await request(app.getHttpServer())
        .post('/producers')
        .send(producerBody)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject(expectedResponse);

      expect(response.body.id).toBeDefined();
    });
  });
});
