import { Test, TestingModule } from '@nestjs/testing';
import { AccesscontrolController } from './accesscontrol.controller';
import { AccesscontrolService } from './accesscontrol.service';

describe('AccesscontrolController', () => {
  let controller: AccesscontrolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccesscontrolController],
      providers: [AccesscontrolService],
    }).compile();

    controller = module.get<AccesscontrolController>(AccesscontrolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
