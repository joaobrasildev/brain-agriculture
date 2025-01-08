import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '@src/shared/persistence/typeorm/repository/default-typeorm.repository';
import { AgriculturalCropsModel } from '../../core/model/agricultural-crops.model';
import { AgriculturalCropsEntity } from '../entity/agricultural-crops.entity';

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
      landuse: entity.landuse,
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
      landuse: model.landuse,
      area: model.area,
    });
  }
}
