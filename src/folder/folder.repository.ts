import { Injectable } from '@nestjs/common';
import { DataSource, TreeRepository } from 'typeorm';
import { Folder } from './entities/folder.entity';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository extends TreeRepository<Folder> {
  constructor(private dataSource: DataSource) {
    super(Folder, dataSource.createEntityManager());
  }

  async getTree(): Promise<Folder[]> {
    return this.findTrees({ relations: ['documents'] });
  }

  async createFolder(folder: Folder): Promise<Folder> {
    return this.save(folder);
  }

  async findFolderById(id: number): Promise<Folder | null> {
    return this.findOne({ where: { id } });
  }

  async deleteFolder(folderId: number): Promise<void> {
    await this.delete(folderId);
  }
}
