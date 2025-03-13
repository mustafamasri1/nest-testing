import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository, TreeRepository } from 'typeorm';
import { Document } from './entities/document.entity';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }
}
