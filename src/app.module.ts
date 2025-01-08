import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/module/config/config.module';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
