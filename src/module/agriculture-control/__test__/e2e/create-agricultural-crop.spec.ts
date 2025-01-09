import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ProducerRepository } from '../../persistence/repository/producer.repository';
import { AgricultureControlModule } from '../../agriculture-control.module';
import { FarmRepository } from '../../persistence/repository/farm.repository';
import { ProducerModel } from '../../core/model/producer.model';
import { EDocumentType } from '../../core/enum/producer.enum';
import { randomUUID } from 'crypto';
import { AgriculturalCropsRepository } from '../../persistence/repository/agricultural-crops.repository';
import { FarmEntity } from '../../persistence/entity/farm.entity';
import { ECrops, ELandUse } from '../../core/enum/crop.enum';

describe('Create Agricultural Crop - Test (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;
  let producerRepository: ProducerRepository;
  let farmRepository: FarmRepository;
  let agriculturalCropRepository: AgriculturalCropsRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AgricultureControlModule],
    }).compile();

    app = module.createNestApplication();
    producerRepository = module.get<ProducerRepository>(ProducerRepository);
    farmRepository = module.get<FarmRepository>(FarmRepository);
    agriculturalCropRepository = module.get<AgriculturalCropsRepository>(
      AgriculturalCropsRepository,
    );
    await app.init();
  });

  beforeEach(async () => {
    await producerRepository.deleteAll();
    await farmRepository.deleteAll();
    await agriculturalCropRepository.deleteAll();
  });
  afterAll(async () => await module.close());

  describe('/agricultural-crops', () => {
    it('should be create a farm', async () => {
      const producerId = randomUUID();
      const producerEntity = new ProducerModel({
        id: producerId,
        name: 'João Santos',
        documentId: '33295457000120',
        documentType: EDocumentType.CNPJ,
      });
      await producerRepository.saveProducer(producerEntity);

      const farmId = randomUUID();
      const farmEntity = new FarmEntity({
        id: farmId,
        name: 'Fazenda Brasil',
        producerId,
        city: 'Maringá',
        state: 'Paraná',
        totalArea: 7000,
        agriculturalArea: 5000,
        vegetationArea: 2000,
      });
      await farmRepository.saveFarm(farmEntity);

      const agriculturalCropBody = {
        harvest: 2025,
        crop: ECrops.CORN,
        farmId: farmId,
        landUse: ELandUse.AGRICULTURAL,
        area: 5000,
      };

      const expectedResponse = {
        harvest: 2025,
        crop: 'CORN',
        farmId: farmId,
        landUse: 'AGRICULTURAL',
        area: 5000,
      };

      const response = await request(app.getHttpServer())
        .post('/agricultural-crops')
        .send(agriculturalCropBody)
        .expect(HttpStatus.CREATED);

      expect(response.body).toMatchObject(expectedResponse);

      expect(response.body.id).toBeDefined();
    });
  });
});
