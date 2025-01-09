import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { CreateProducerService } from './core/service/producer/create-producer.service';
import { CreateProcessController } from './http/controller/producer/create-producer.controller';
import { UpdateProducerService } from './core/service/producer/update-producer.service';
import { UpdateProducerController } from './http/controller/producer/update-producer.controller';

@Module({
  imports: [PersistenceModule.forRoot()],
  providers: [CreateProducerService, UpdateProducerService],
  controllers: [CreateProcessController, UpdateProducerController],
})
export class AgricultureControlModule {}
