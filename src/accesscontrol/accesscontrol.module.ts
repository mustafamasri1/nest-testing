import { Module } from '@nestjs/common';
import { AccesscontrolService } from './accesscontrol.service';
import { AccesscontrolController } from './accesscontrol.controller';

@Module({
  controllers: [AccesscontrolController],
  providers: [AccesscontrolService],
})
export class AccesscontrolModule {}
