import { DefaultEntity } from '@src/shared/persistence/typeorm/entity/default.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'farm' })
export class FarmEntity extends DefaultEntity<FarmEntity> {
  @Column({ nullable: false, type: 'varchar' })
  name: string;

  @Column({ nullable: false, type: 'uuid' })
  producerId: string;

  @Column({ nullable: false, type: 'varchar' })
  city: string;

  @Column({ nullable: false, type: 'varchar' })
  state: string;

  @Column({ nullable: false, type: 'int' })
  totalArea: number;

  @Column({ nullable: false, type: 'int' })
  agriculturalArea: number;

  @Column({ nullable: false, type: 'int' })
  vegetationArea: number;
}
