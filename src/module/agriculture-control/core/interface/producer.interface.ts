import { EDocumentType } from '../enum/producer.enum';

export interface ICreateProducerInput {
  name: string;
  documentId: string;
  documentType: EDocumentType;
}

export interface ICreateProducerOutput {
  id: string;
  name: string;
  documentId: string;
  documentType: EDocumentType;
  createdAt: Date;
}
