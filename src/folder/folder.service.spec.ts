import { Test, TestingModule } from '@nestjs/testing';
import { FolderService } from './folder.service';
import { FolderRepository } from './folder.repository';
import { Folder } from './entities/folder.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';

describe('FolderService', () => {
  let service: FolderService;
  let folderRepo: jest.Mocked<FolderRepository>;
  let folderMock: Folder = {
    id: 1,
    name: 'new folder',
    children: [],
    documents: [],
    parentId: null,
    path: 'new_folder',
    parent: undefined,
  };
  let folderDto: CreateFolderDto = {
    name: 'new folder',
    path: 'new_folder',
    parentId: undefined,
  };

  let folders = Array.from({ length: 10 }, (_, __) => folderMock);

  const mockRepo: jest.Mocked<Partial<FolderRepository>> = {
    createFolder: jest.fn().mockResolvedValue(folderMock),
    getTree: jest.fn().mockResolvedValue([folderMock]),
    findFolderById: jest.fn().mockImplementation((id) => {
      return Promise.resolve(folders.find((f) => f.id === id)) ?? null;
    }),
    deleteFolder: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FolderService,
        {
          provide: FolderRepository,
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<FolderService>(FolderService);
    folderRepo = module.get(FolderRepository);
  });

  describe('Check DI', () => {
    it('Service should be defined', () => {
      expect(service).toBeDefined();
      expect(folderRepo).toBeDefined();
    });
  });

  describe('getTrees', () => {
    it('Should get one tree', async () => {
      const result = await service.getTree();
      expect(result).toEqual([folderMock]);
      expect(result).toHaveLength(1);
      expect(folderRepo.getTree).toHaveBeenCalledTimes(1);
    });
  });
  describe('createFolder', () => {
    it('Should create new folder', async () => {
      const result = await service.createFolder(folderDto);
      expect(result).toEqual(folderMock);
      expect(folderRepo.createFolder).toHaveBeenCalledTimes(1);
    });
  });
  describe('deleteFolder', () => {
    it('Should get folder with id 1', async () => {
      const result = await service.deleteFolder(1);
      expect(result).toEqual({ affected: 1 });
      expect(folderRepo.deleteFolder).toHaveBeenCalledTimes(1);
    });
    it('Should throw not found if folder is not exist', async () => {
      folderRepo.deleteFolder.mockRejectedValue(new NotFoundException());
      await expect(service.deleteFolder(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(folderRepo.deleteFolder).toHaveBeenCalledTimes(0);
    });
  });
});
