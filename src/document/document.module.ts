import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { Document } from './entities/document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentRepository } from './document.repository';
import { FolderRepository } from 'src/folder/folder.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Document])],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository, FolderRepository],
  exports: [DocumentService],
})
export class DocumentModule {}
