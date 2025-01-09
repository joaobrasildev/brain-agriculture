import { faker } from '@faker-js/faker/.';
import { EDocumentType } from '../../../enum/producer.enum';

export const getProducerByIdResponseMock = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  documentId: '33295457000120',
  documentType: EDocumentType.CNPJ,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const createFarmResponseMock = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  producerId: faker.string.uuid(),
  city: faker.location.city(),
  state: faker.location.state(),
  totalArea: faker.number.int(),
  agriculturalArea: faker.number.int(),
  vegetationArea: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const createFarmInputMock = {
  name: faker.company.name(),
  producerId: faker.string.uuid(),
  city: faker.location.city(),
  state: faker.location.state(),
  totalArea: 7000,
  agriculturalArea: 3000,
  vegetationArea: 4000,
};
