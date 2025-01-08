import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@src/shared/module/config/config.module';
import { TypeOrmPersistenceModule } from '@src/shared/persistence/typeorm/typeorm-persistence.module';
import { ProducerEntity } from './entity/producer.entity';
import { FarmEntity } from './entity/farm.entity';
import { AgriculturalCropsEntity } from './entity/agricultural-crops.entity';
import { ProducerRepository } from './repository/producer.repository';
import { FarmRepository } from './repository/farm.repository';
import { AgriculturalCropsRepository } from './repository/agricultural-crops.repository';

@Module({})
export class PersistenceModule {
  static forRoot(opts?: { migrations?: string[] }): DynamicModule {
    const { migrations } = opts || {};
    return {
      module: PersistenceModule,
      imports: [
        TypeOrmPersistenceModule.forRoot({
          migrations,
          entities: [ProducerEntity, FarmEntity, AgriculturalCropsEntity],
        }),
        ConfigModule.forRoot(),
      ],
      providers: [
        ProducerRepository,
        FarmRepository,
        AgriculturalCropsRepository,
      ],
      exports: [
        ProducerRepository,
        FarmRepository,
        AgriculturalCropsRepository,
      ],
    };
  }
}
