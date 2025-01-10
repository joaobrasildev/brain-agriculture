import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { internalServerErrorResponseMessage } from '../../const/producer.const';
import { FarmRepository } from '@src/module/agriculture-control/persistence/repository/farm.repository';
import { AgriculturalCropsRepository } from '@src/module/agriculture-control/persistence/repository/agricultural-crops.repository';
import {
  ICreateAgriculturalCropInput,
  ICreateAgriculturalCropOutput,
} from '../../interface/agricultural-crop.interface';
import {
  CropAlreadyExistsResponseMessage,
  farmNotFoundResponseMessage,
  invalidCropAreaResponseMessage,
} from '../../const/agricultural-crop.const';
import { AgriculturalCropsModel } from '../../model/agricultural-crops.model';

@Injectable()
export class CreateAgriculturalCropService {
  constructor(
    private readonly farmRepository: FarmRepository,
    private readonly agriculturalCropRepository: AgriculturalCropsRepository,
  ) {}
  async create(
    params: ICreateAgriculturalCropInput,
  ): Promise<ICreateAgriculturalCropOutput> {
    try {
      const farmExists = await this.farmRepository.getFarmById(params.farmId);
      if (!farmExists) throw new NotFoundException(farmNotFoundResponseMessage);

      const totalCultivatedAreaByHarvest =
        await this.agriculturalCropRepository.getTotalCultivatedAreaByFarmIdAndHarvest(
          params.farmId,
          params.harvest,
        );

      if (farmExists.totalArea < params.area + totalCultivatedAreaByHarvest)
        throw new BadRequestException(invalidCropAreaResponseMessage);

      const cropExistsInFarm =
        await this.agriculturalCropRepository.getCulturalCropByCropAndFarmAndHarvest(
          params.crop,
          params.farmId,
          params.harvest,
        );
      if (cropExistsInFarm)
        throw new ConflictException(CropAlreadyExistsResponseMessage);

      const agriculturalCropsModel = new AgriculturalCropsModel({
        harvest: params.harvest,
        crop: params.crop,
        farmId: params.farmId,
        landUse: params.landUse,
        area: params.area,
      });

      const agriculturalCrops =
        await this.agriculturalCropRepository.saveAgriculturalCrops(
          agriculturalCropsModel,
        );

      return {
        id: agriculturalCrops.id,
        harvest: agriculturalCrops.harvest,
        crop: agriculturalCrops.crop,
        farmId: agriculturalCrops.farmId,
        landUse: agriculturalCrops.landUse,
        area: agriculturalCrops.area,
        createdAt: agriculturalCrops.createdAt,
      };
    } catch (error) {
      console.log(error);
      if (
        error instanceof NotFoundException ||
        BadRequestException ||
        ConflictException
      ) {
        throw error;
      }
      console.log(
        `CREATE_AGRICULTURAL_CROP_ERROR::STATUS_CODE=500::FARM_CROP=${params.crop}::FARM_ID=${params.farmId}`,
      );
      throw new InternalServerErrorException(
        internalServerErrorResponseMessage,
      );
    }
  }
}
