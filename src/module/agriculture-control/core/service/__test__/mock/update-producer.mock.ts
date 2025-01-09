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

export const updateProducerResponseMock = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  documentId: '33295457000120',
  documentType: EDocumentType.CNPJ,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const updateProducerInputMock = {
  name: faker.person.fullName(),
};
