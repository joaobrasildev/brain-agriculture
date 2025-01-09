import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '@src/shared/persistence/typeorm/repository/default-typeorm.repository';
import { FarmEntity } from '../entity/farm.entity';
import { FarmModel } from '../../core/model/farm.model';

@Injectable()
export class FarmRepository extends DefaultTypeOrmRepository<FarmEntity> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(FarmEntity, dataSource);
  }

  async saveFarm(model: FarmModel): Promise<FarmModel> {
    const farm = this.modelToEntity(model);
    await this.repository.save(farm);

    return this.entityToModel(farm);
  }

  async getFarmById(id: string): Promise<FarmModel | undefined> {
    const farm = await this.repository.findOne({
      where: {
        id,
      },
    });
    if (!farm) return;

    return farm;
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }

  private entityToModel(entity: FarmEntity): FarmModel {
    return new FarmModel({
      id: entity.id,
      name: entity.name,
      producerId: entity.producerId,
      city: entity.city,
      state: entity.state,
      totalArea: entity.totalArea,
      agriculturalArea: entity.agriculturalArea,
      vegetationArea: entity.vegetationArea,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  private modelToEntity(model: FarmModel): FarmEntity {
    return new FarmEntity({
      id: model.id,
      name: model.name,
      producerId: model.producerId,
      city: model.city,
      state: model.state,
      totalArea: model.totalArea,
      agriculturalArea: model.agriculturalArea,
      vegetationArea: model.vegetationArea,
    });
  }
}
