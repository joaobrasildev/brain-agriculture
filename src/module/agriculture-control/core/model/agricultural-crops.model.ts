import { WithOptional } from '@src/shared/core/model/default.model';
import { randomUUID } from 'crypto';
import { ECrops, ELandUse } from '../enum/crop.enum';

export class AgriculturalCropsModel {
  id: string;
  harvest: number;
  crop: ECrops;
  farmId: string;
  landuse: ELandUse;
  area: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(
    data: WithOptional<
      AgriculturalCropsModel,
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
