import { Test, TestingModule } from '@nestjs/testing';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { NotFoundException } from '@nestjs/common';
import { error } from 'console';

describe('FolderController', () => {
  let controller: FolderController;
  let folderService: jest.Mocked<FolderService>;
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

  const mockService: jest.Mocked<Partial<FolderService>> = {
    createFolder: jest.fn().mockResolvedValue(folderMock),
    getTree: jest.fn().mockResolvedValue([folderMock]),
    deleteFolder: jest.fn().mockResolvedValue({ affected: 1 }),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolderController],
      providers: [
        {
          provide: FolderService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FolderController>(FolderController);
    folderService = module.get(FolderService);
  });

  describe('Check DI', () => {
    it('Controller should be defined', () => {
      expect(controller).toBeDefined();
      expect(folderService).toBeDefined();
    });
  });

  describe('createFolder', () => {
    it('Should create a new folder', async () => {
      const result = await controller.createFolder(folderDto);
      expect(result).toEqual(folderMock);
      expect(folderService.createFolder).toHaveBeenCalledWith(folderDto);
      expect(folderService.createFolder).toHaveBeenCalledTimes(1);
    });

    it('Should throw creation failed error if creation fail', async () => {
      folderService.createFolder.mockRejectedValue(
        new Error('Failed to create folder'),
      );

      await expect(controller.createFolder(folderDto)).rejects.toThrowError(
        expect.objectContaining({
          response: 'Failed to create folder',
          status: 500,
        }),
      );
    });
  });

  describe('deleteFolder', () => {
    it('Should delete folder of id 1', async () => {
      const result = await controller.deleteFolder(1);
      expect(result).toEqual({ affected: 1 });
      expect(folderService.deleteFolder).toHaveBeenCalledTimes(1);
    });
    it('Should throw error while delete if deleting fail', async () => {
      folderService.deleteFolder.mockRejectedValue(new Error('Deleting Fail'));
      await expect(controller.deleteFolder(999)).rejects.toThrow(
        expect.objectContaining({
          response: 'Deleting Fail',
          status: 500,
        }),
      );
    });
  });
  describe('getSubFolders', () => {
    it('Should get subfolders ', async () => {
      const result = await controller.getSubfolders('');
      expect(result).toEqual([folderMock]);
      expect(folderService.getTree).toHaveBeenCalledTimes(1);
    });
    it('Should throw Error if getting subfolders Fail', async () => {
      folderService.getTree.mockRejectedValue(
        new Error('Something goes wrong!'),
      );
      await expect(controller.getSubfolders('')).rejects.toThrow(
        expect.objectContaining({
          response: 'Something goes wrong!',
          status: 500,
        }),
      );
      expect(folderService.getTree).toHaveBeenCalledTimes(1);
    });
  });
});
