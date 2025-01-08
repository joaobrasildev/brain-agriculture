import { WithOptional } from '@src/shared/core/model/default.model';
import { randomUUID } from 'crypto';

export class FarmModel {
  id: string;
  name: string;
  producerId: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    data: WithOptional<
      FarmModel,
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
