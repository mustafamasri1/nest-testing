import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { DocumentRepository } from './document.repository';
import { FolderRepository } from '../folder/folder.repository';

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: DocumentRepository,
          useValue: {},
        },
        {
          provide: FolderRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });
  it('test', () => {});
});
