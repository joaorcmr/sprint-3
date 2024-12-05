import { Module } from '@nestjs/common';
import { EnvModule } from './infra/env.module';
import { DatabaseModule } from './infra/database.module';
import { AuthModule } from './auth/auth.module';
import { AttendantsModule } from './attendants/attendants.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EnvModule,
    DatabaseModule,
    AuthModule,
    AttendantsModule,
    UsersModule,
  ],
})
export class AppModule {}
