import { Test } from '@nestjs/testing';
import { FarmRepository } from '@src/module/agriculture-control/persistence/repository/farm.repository';
import { CreateAgriculturalCropService } from '../../agricultural-crop/create-agricultural-crop.service';
import { AgriculturalCropsRepository } from '@src/module/agriculture-control/persistence/repository/agricultural-crops.repository';
import {
  createAgriculturalCropInputMock,
  createAgriculturalCropResponseMock,
  getFarmByFarmIdResponseMock,
} from '../mock/create-agricultural-crop.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  farmNotFoundResponseMessage,
  invalidCropAreaResponseMessage,
} from '../../../const/agricultural-crop.const';

describe('CreateAgriculturalCropService', () => {
  let createAgriculturalCropService: CreateAgriculturalCropService;
  let agriculturalCropRepository: jest.Mocked<AgriculturalCropsRepository>;
  let farmRepository: jest.Mocked<FarmRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateAgriculturalCropService,
        {
          provide: FarmRepository,
          useValue: {
            getFarmById: jest.fn(),
          },
        },
        {
          provide: AgriculturalCropsRepository,
          useValue: {
            saveAgriculturalCrops: jest.fn(),
            getTotalCultivatedAreaByFarmIdAndHarvest: jest.fn(),
          },
        },
      ],
    }).compile();

    createAgriculturalCropService =
      moduleRef.get<CreateAgriculturalCropService>(
        CreateAgriculturalCropService,
      );
    agriculturalCropRepository = moduleRef.get(AgriculturalCropsRepository);
    farmRepository = moduleRef.get(FarmRepository);
  });

  it('to be defined', () => {
    expect(createAgriculturalCropService).toBeDefined();
    expect(agriculturalCropRepository).toBeDefined();
    expect(farmRepository).toBeDefined();
  });

  it('should be create agricultural crop', async () => {
    farmRepository.getFarmById.mockResolvedValue(getFarmByFarmIdResponseMock);
    agriculturalCropRepository.getTotalCultivatedAreaByFarmIdAndHarvest.mockResolvedValue(
      20000,
    );
    agriculturalCropRepository.saveAgriculturalCrops.mockResolvedValue(
      createAgriculturalCropResponseMock,
    );

    await createAgriculturalCropService.create(createAgriculturalCropInputMock);

    expect(farmRepository.getFarmById).toHaveBeenCalledTimes(1);
    expect(farmRepository.getFarmById).toHaveBeenCalledWith(
      createAgriculturalCropInputMock.farmId,
    );
    expect(
      agriculturalCropRepository.saveAgriculturalCrops,
    ).toHaveBeenCalledTimes(1);
  });

  it('Should not be create agricultural crop and return farm not found error', async () => {
    farmRepository.getFarmById.mockResolvedValue(undefined);

    await expect(
      createAgriculturalCropService.create(createAgriculturalCropInputMock),
    ).rejects.toEqual(new NotFoundException(farmNotFoundResponseMessage));
    expect(farmRepository.getFarmById).toHaveBeenCalledTimes(1);
    expect(farmRepository.getFarmById).toHaveBeenCalledWith(
      createAgriculturalCropInputMock.farmId,
    );
    expect(
      agriculturalCropRepository.saveAgriculturalCrops,
    ).toHaveBeenCalledTimes(0);
  });

  it('Should not be create agricultural crop and return invalid crop area error', async () => {
    farmRepository.getFarmById.mockResolvedValue({
      ...getFarmByFarmIdResponseMock,
      totalArea: 1000,
    });
    agriculturalCropRepository.getTotalCultivatedAreaByFarmIdAndHarvest.mockResolvedValue(
      1000,
    );
    await expect(
      createAgriculturalCropService.create({
        ...createAgriculturalCropInputMock,
        area: 100000,
      }),
    ).rejects.toEqual(new BadRequestException(invalidCropAreaResponseMessage));
    expect(farmRepository.getFarmById).toHaveBeenCalledTimes(1);
    expect(
      agriculturalCropRepository.saveAgriculturalCrops,
    ).toHaveBeenCalledTimes(0);
  });
});
