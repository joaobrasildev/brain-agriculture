import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { CreateProducerService } from './core/service/producer/create-producer.service';
import { CreateProcessController } from './http/controller/producer/create-producer.controller';

@Module({
  imports: [PersistenceModule.forRoot()],
  providers: [CreateProducerService],
  controllers: [CreateProcessController],
})
export class AgricultureControlModule {}
