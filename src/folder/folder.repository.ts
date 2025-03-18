import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, TreeRepository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FolderRepository {
  constructor(
    @InjectRepository(Folder)
    private treeRepo: TreeRepository<Folder>,
  ) {}

  async getTree(): Promise<Folder[]> {
    return this.treeRepo.findTrees({ relations: ['documents'] });
  }

  async createFolder(folder: Folder): Promise<Folder> {
    return this.treeRepo.save(folder);
  }

  async findFolderById(id: number): Promise<Folder | null> {
    return this.treeRepo.findOne({ where: { id } });
  }

  async deleteFolder(folderId: number) {
    return await this.treeRepo.delete(folderId);
  }
}
