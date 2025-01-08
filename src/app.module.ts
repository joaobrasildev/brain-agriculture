import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/module/config/config.module';
import { AgricultureControlModule } from './module/agriculture-control/agriculture-control.module';

@Module({
  imports: [ConfigModule.forRoot(), AgricultureControlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
