import { faker } from '@faker-js/faker/.';
import { EDocumentType } from '../../../enum/producer.enum';

export const getAllProducerResponseMock = [
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    documentId: '33295457000120',
    documentType: EDocumentType.CNPJ,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];
