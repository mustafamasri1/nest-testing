import { Injectable, NotFoundException } from '@nestjs/common';
import { FolderRepository } from './folder.repository';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderService {
  constructor(private readonly folderRepository: FolderRepository) {}

  async createFolder(folderData: CreateFolderDto): Promise<Folder> {
    try {
      if (!folderData.name || !folderData.name.trim()) {
        throw new Error('Folder name cannot be empty');
      }

      const folder = new Folder();
      folder.name = folderData.name.trim();
      const sanitizedName = folder.name.replace(/[^a-zA-Z0-9_]/g, '_');

      if (folderData.parentId) {
        const parentFolder = await this.folderRepository.findFolderById(folderData.parentId);
        if (!parentFolder) {
          throw new NotFoundException(`Parent folder with ID ${folderData.parentId} not found`);
        }
        folder.parent = parentFolder;
        folder.path = `${parentFolder.path}.${sanitizedName}`; 
      } else {
        folder.path = sanitizedName;
      }

      return await this.folderRepository.createFolder(folder);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to create folder: ${error.message}`);
    }
  }
  

  async getTree(): Promise<Folder[]> {
    try {
      return await this.folderRepository.getTree();
    } catch (error) {
      throw new Error(`Failed to get folder tree: ${error.message}`);
    }
  }

  async deleteFolder(folderId: number): Promise<void> {
    try {
      const folder = await this.folderRepository.findFolderById(folderId);
      if (!folder) {
        throw new NotFoundException(`Folder with ID ${folderId} not found`);
      }
      await this.folderRepository.deleteFolder(folderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to delete folder: ${error.message}`);
    }
  }
}
