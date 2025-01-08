import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DefaultTypeOrmRepository } from '@src/shared/persistence/typeorm/repository/default-typeorm.repository';
import { ProducerModel } from '../../core/model/producer.model';
import { ProducerEntity } from '../entity/producer.entity';

@Injectable()
export class ProducerRepository extends DefaultTypeOrmRepository<ProducerEntity> {
  constructor(@Inject(DataSource) readonly dataSource: DataSource) {
    super(ProducerEntity, dataSource);
  }
  async saveProducer(model: ProducerModel): Promise<ProducerModel> {
    const producer = this.modelToEntity(model);
    await this.repository.save(producer);

    return this.entityToModel(producer);
  }

  async updateProducer(model: ProducerModel): Promise<ProducerModel> {
    const producer = this.modelToEntity(model);
    await this.repository.update({ id: model.id }, producer);

    return this.entityToModel(producer);
  }

  async getProducerByDocumentId(
    documentId: string,
  ): Promise<ProducerModel | undefined> {
    const producer = await this.repository.findOne({
      where: {
        documentId,
      },
    });
    if (!producer) return;

    return producer;
  }

  async deleteproducerById(id: string): Promise<void> {
    await this.repository.softDelete({ id });
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }

  private entityToModel(entity: ProducerEntity): ProducerModel {
    return new ProducerModel({
      id: entity.id,
      name: entity.name,
      documentId: entity.documentId,
      documentType: entity.documentType,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }

  private modelToEntity(model: ProducerModel): ProducerEntity {
    return new ProducerEntity({
      id: model.id,
      name: model.name,
      documentId: model.documentId,
      documentType: model.documentType,
    });
  }
}
