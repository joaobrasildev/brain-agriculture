export interface ICreateFarmInput {
  name: string;
  producerId: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
}

export interface ICreateFarmOutput {
  id: string;
  name: string;
  producerId: string;
  city: string;
  state: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  createdAt: Date;
}
