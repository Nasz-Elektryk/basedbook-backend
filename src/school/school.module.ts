import { CacheModule, Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService],
  imports: [AuthModule, CacheModule.register()],
})
export class SchoolModule {}
