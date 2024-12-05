import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeorm from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeorm],
    }),
  ],
})
export class EnvModule {}
