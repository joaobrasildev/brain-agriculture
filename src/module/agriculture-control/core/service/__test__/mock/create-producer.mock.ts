import { faker } from '@faker-js/faker/.';
import { EDocumentType } from '../../../enum/producer.enum';

export const getProducerByDocumentIdResponseMock = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  documentId: '33295457000120',
  documentType: EDocumentType.CNPJ,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const createProducerResponseMock = {
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  documentId: '33295457000120',
  documentType: EDocumentType.CNPJ,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const createProducerInputMock = {
  name: faker.person.fullName(),
  documentId: '33295457000120',
  documentType: EDocumentType.CNPJ,
};

export const createProducerWithInvalidDocumentInputMock = {
  name: faker.person.fullName(),
  documentId: faker.string.numeric({ length: 14 }),
  documentType: EDocumentType.CNPJ,
};
