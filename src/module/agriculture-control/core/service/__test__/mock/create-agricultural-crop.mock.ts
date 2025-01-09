import { faker } from '@faker-js/faker/.';
import { ECrops, ELandUse } from '../../../enum/crop.enum';

export const getFarmByFarmIdResponseMock = {
  id: faker.string.uuid(),
  name: faker.company.name(),
  producerId: faker.string.uuid(),
  city: faker.location.city(),
  state: faker.location.state(),
  totalArea: faker.number.int(),
  agriculturalArea: faker.number.int(),
  vegetationArea: faker.number.int(),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export const createAgriculturalCropInputMock = {
  harvest: 2025,
  crop: ECrops.CORN,
  farmId: faker.string.uuid(),
  landUse: ELandUse.AGRICULTURAL,
  area: faker.number.int({ max: 1000 }),
};

export const createAgriculturalCropResponseMock = {
  id: faker.string.uuid(),
  harvest: 2025,
  crop: ECrops.CORN,
  farmId: faker.string.uuid(),
  landUse: ELandUse.AGRICULTURAL,
  area: faker.number.int({ max: 1000 }),
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
