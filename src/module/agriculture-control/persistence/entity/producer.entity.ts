import { DefaultEntity } from '@src/shared/persistence/typeorm/entity/default.entity';
import { Column, Entity } from 'typeorm';
import { EDocumentType } from '../../core/enum/producer.enum';

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
}
