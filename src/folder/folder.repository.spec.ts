import { DeleteResult, TreeRepository } from 'typeorm';
import { FolderRepository } from './folder.repository';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { NotFoundException } from '@nestjs/common';

describe('Folder Repo', () => {
  let folderRepo: FolderRepository;
  let treeRepo: jest.Mocked<TreeRepository<Folder>>;

  let folderMock: Folder = {
    id: 1,
    name: 'new folder',
    children: [],
    documents: [],
    parentId: null,
    path: 'new_folder',
    parent: new Folder(),
  };

  let foldersMock = Array.from({ length: 10 }, (_, __) => folderMock);

  const mockTreeRepo: jest.Mocked<Partial<TreeRepository<Folder>>> = {
    findTrees: jest.fn().mockResolvedValue(foldersMock),
    save: jest.fn().mockResolvedValue(folderMock),
    findOne: jest.fn().mockResolvedValue(folderMock),
    delete: jest.fn().mockResolvedValue({ affected: 1 } as DeleteResult),
    average: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FolderRepository,
        {
          provide: getRepositoryToken(Folder),
          useValue: mockTreeRepo,
        },
      ],
    }).compile();

    folderRepo = module.get<FolderRepository>(FolderRepository);
    treeRepo = module.get(getRepositoryToken(Folder));
  });

  describe('Check DI', () => {
    it('Repositories should be defined', () => {
      expect(folderRepo).toBeDefined();
      expect(treeRepo).toBeDefined();
    });
  });

  describe('getTree', () => {
    it('Should get all folders', async () => {
      const result = await folderRepo.getTree();
      expect(result).toEqual(foldersMock);
      expect(result).toHaveLength(10);
      expect(treeRepo.findTrees).toHaveBeenCalledTimes(1);
    });
  });
  describe('createFolder', () => {
    it('Should create new folder', async () => {
      const result = await folderRepo.createFolder(folderMock);
      expect(result).toEqual(folderMock);
      expect(treeRepo.save).toHaveBeenCalledTimes(1);
    });
  });
  describe('findFolderById', () => {
    it('Should get folder if folder exist', async () => {
      const result = await folderRepo.findFolderById(1);
      expect(result).toEqual(folderMock);
      expect(treeRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
    it('Should return null if folder is not exist', async () => {
      treeRepo.findOne.mockResolvedValue(null);
      const result = await folderRepo.findFolderById(99999);
      expect(result).toEqual(null);
      expect(treeRepo.findOne).toHaveBeenCalledWith({ where: { id: 99999 } });
    });
  });

  describe('deleteFolder', () => {
    it('Should delete  folder', async () => {
      const result = await folderRepo.deleteFolder(1);
      expect(result).toEqual({ affected: 1 } as DeleteResult);
      expect(treeRepo.delete).toHaveBeenCalledTimes(1);
    });

    it('Should throw not found if folder not found', async () => {
      treeRepo.delete.mockRejectedValue(new NotFoundException());
      await expect(folderRepo.deleteFolder(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(treeRepo.delete).toHaveBeenCalledTimes(1);
    });
  });
});
