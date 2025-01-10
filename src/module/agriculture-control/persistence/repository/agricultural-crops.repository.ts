import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '@src/shared/persistence/typeorm/repository/default-typeorm.repository';
import { AgriculturalCropsModel } from '../../core/model/agricultural-crops.model';
import { AgriculturalCropsEntity } from '../entity/agricultural-crops.entity';
import { ECrops } from '../../core/enum/crop.enum';

@Injectable()
export class AgriculturalCropsRepository extends DefaultTypeOrmRepository<AgriculturalCropsEntity> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(AgriculturalCropsEntity, dataSource);
  }
  async saveAgriculturalCrops(
    model: AgriculturalCropsModel,
  ): Promise<AgriculturalCropsModel> {
    const agriculturalCrops = this.modelToEntity(model);
    await this.repository.save(agriculturalCrops);

    return this.entityToModel(agriculturalCrops);
  }

  async updateAgriculturalCrops(
    model: AgriculturalCropsModel,
  ): Promise<AgriculturalCropsModel> {
    const agriculturalCrops = this.modelToEntity(model);
    await this.repository.update({ id: model.id }, agriculturalCrops);

    return this.entityToModel(agriculturalCrops);
  }

  async getTotalCultivatedAreaByFarmIdAndHarvest(
    farmId: string,
    harvest: number,
  ): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('agriculturalCrops')
      .select('SUM(agriculturalCrops.area)', 'totalArea')
      .where('agriculturalCrops.farmId = :farmId', { farmId })
      .andWhere('agriculturalCrops.harvest = :harvest', { harvest })
      .getRawOne();

    return result?.totalArea ? Number(result.totalArea) : 0;
  }

  async getCulturalCropByCropAndFarmAndHarvest(
    crop: ECrops,
    farmId: string,
    harvest: number,
  ): Promise<AgriculturalCropsModel | undefined> {
    const culturalCrop = await this.repository.findOne({
      where: {
        crop,
        farmId,
        harvest,
      },
    });
    if (!culturalCrop) return;

    return culturalCrop;
  }

  async deleteagriculturalCropsById(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }

  private entityToModel(
    entity: AgriculturalCropsEntity,
  ): AgriculturalCropsModel {
    return new AgriculturalCropsModel({
      id: entity.id,
      harvest: entity.harvest,
      crop: entity.crop,
      farmId: entity.farmId,
      landUse: entity.landUse,
      area: entity.area,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  private modelToEntity(
    model: AgriculturalCropsModel,
  ): AgriculturalCropsEntity {
    return new AgriculturalCropsEntity({
      id: model.id,
      harvest: model.harvest,
      crop: model.crop,
      farmId: model.farmId,
      landUse: model.landUse,
      area: model.area,
    });
  }
}
