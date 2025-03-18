import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { DocumentRepository } from './document.repository';
import { FolderRepository } from '../folder/folder.repository';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly folderRepository: FolderRepository,
  ) {}
  async create(createDocumentDto: CreateDocumentDto) {
    const folder = await this.folderRepository.findFolderById(
      createDocumentDto.folderId,
    );

    if (folder) {
      const document = this.documentRepository.create({
        name: createDocumentDto.name,
        filePath: createDocumentDto.filePath,
        folder,
      });

      return this.documentRepository.save(document);
    } else {
      return 'error';
    }
  }
}
