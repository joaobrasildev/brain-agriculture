import { DefaultEntity } from '@src/shared/persistence/typeorm/entity/default.entity';
import { Column, Entity } from 'typeorm';
import { ECrops, ELandUse } from '../../core/enum/crop.enum';

@Entity({ name: 'agriculturalCrops' })
export class AgriculturalCropsEntity extends DefaultEntity<AgriculturalCropsEntity> {
  @Column({ nullable: false, type: 'int' })
  harvest: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ECrops,
    enumName: 'crop',
  })
  crop: ECrops;

  @Column({ nullable: false, type: 'uuid' })
  farmId: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ELandUse,
    enumName: 'landUse',
  })
  landuse: ELandUse;

  @Column({ nullable: false, type: 'int' })
  area: number;
}
