import { DefaultEntity } from '@src/shared/persistence/typeorm/entity/default.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { EDocumentType } from '../../core/enum/producer.enum';
import { FarmEntity } from './farm.entity';

@Entity({ name: 'producer' })
export class ProducerEntity extends DefaultEntity<ProducerEntity> {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  documentId: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: EDocumentType,
    enumName: 'documentType',
  })
  documentType: EDocumentType;

  @ManyToOne(() => FarmEntity, (farm) => farm.producer, {
    cascade: true,
  })
  farms: FarmEntity;
}
