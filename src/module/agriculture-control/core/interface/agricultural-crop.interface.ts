import { ECrops, ELandUse } from '../enum/crop.enum';

export interface ICreateAgriculturalCropInput {
  harvest: number;
  crop: ECrops;
  farmId: string;
  landUse: ELandUse;
  area: number;
}

export interface ICreateAgriculturalCropOutput {
  id: string;
  harvest: number;
  crop: ECrops;
  farmId: string;
  landUse: ELandUse;
  area: number;
  createdAt: Date;
}
