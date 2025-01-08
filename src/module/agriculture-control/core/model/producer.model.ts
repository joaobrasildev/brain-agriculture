import { WithOptional } from '@src/shared/core/model/default.model';
import { randomUUID } from 'crypto';
import { EDocumentType } from '../enum/producer.enum';

export class ProducerModel {
  id: string;
  name: string;
  documentId: string;
  documentType: EDocumentType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    data: WithOptional<
      ProducerModel,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ) {
    Object.assign(this, {
      ...data,
      id: data.id ? data.id : randomUUID(),
      createdAt: data.createdAt || Date.now(),
      updatedAt: data.updatedAt || Date.now(),
      deletedAt: data.deletedAt,
    });
  }
}
