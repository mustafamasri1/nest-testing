import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Document } from '../../document/entities/document.entity';

@Entity()
@Tree('closure-table')
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int', nullable: true })
  parentId: number | null;

  @Column({ type: 'ltree' })
  @Index()
  path: string;

  @OneToMany(() => Document, (document) => document.folder, { cascade: true })
  documents: Document[];

  @TreeChildren()
  children: Folder[];

  @TreeParent()
  parent?: Folder;
}
