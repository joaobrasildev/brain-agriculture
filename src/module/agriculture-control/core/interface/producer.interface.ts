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

export interface IUpdateProducerInput {
  name: string;
}

export interface IUpdateProducerOutput {
  id: string;
  name: string;
  documentId: string;
  documentType: EDocumentType;
  createdAt: Date;
  updatedAt: Date;
}
