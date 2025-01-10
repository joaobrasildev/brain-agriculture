import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { CreateProducerService } from './core/service/producer/create-producer.service';
import { CreateProcessController } from './http/controller/producer/create-producer.controller';
import { UpdateProducerService } from './core/service/producer/update-producer.service';
import { UpdateProducerController } from './http/controller/producer/update-producer.controller';
import { DeleteProducerService } from './core/service/producer/delete-producer.service';
import { DeleteProducerController } from './http/controller/producer/delete-producer.controller';
import { CreateFarmController } from './http/controller/farm/create-farm.controller';
import { CreateFarmService } from './core/service/farm/create-farm.service';
import { CreateAgriculturalCropController } from './http/controller/agricultural-crop/create-agricultural-crop.controller';
import { CreateAgriculturalCropService } from './core/service/agricultural-crop/create-agricultural-crop.service';
import { GetAllProducerController } from './http/controller/producer/get-all-producer.controller';
import { GetAllProducerService } from './core/service/producer/get-all-producer.service';

@Module({
  imports: [PersistenceModule.forRoot()],
  providers: [
    CreateProducerService,
    UpdateProducerService,
    DeleteProducerService,
    CreateFarmService,
    CreateAgriculturalCropService,
    GetAllProducerService,
  ],
  controllers: [
    CreateProcessController,
    UpdateProducerController,
    DeleteProducerController,
    CreateFarmController,
    CreateAgriculturalCropController,
    GetAllProducerController,
  ],
})
export class AgricultureControlModule {}
