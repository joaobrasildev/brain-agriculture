import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { CreateProducerService } from './core/service/producer/create-producer.service';
import { CreateProcessController } from './http/controller/producer/create-producer.controller';
import { UpdateProducerService } from './core/service/producer/update-producer.service';
import { UpdateProducerController } from './http/controller/producer/update-producer.controller';
import { DeleteProducerService } from './core/service/producer/delete-producer.service';
import { DeleteProducerController } from './http/controller/producer/delete-producer.controller';

@Module({
  imports: [PersistenceModule.forRoot()],
  providers: [
    CreateProducerService,
    UpdateProducerService,
    DeleteProducerService,
  ],
  controllers: [
    CreateProcessController,
    UpdateProducerController,
    DeleteProducerController,
  ],
})
export class AgricultureControlModule {}
