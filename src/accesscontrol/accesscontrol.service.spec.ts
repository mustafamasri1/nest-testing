import { Test, TestingModule } from '@nestjs/testing';
import { AccesscontrolService } from './accesscontrol.service';

describe('AccesscontrolService', () => {
  let service: AccesscontrolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccesscontrolService],
    }).compile();

    service = module.get<AccesscontrolService>(AccesscontrolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
