import { IsEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { CreateFolderDto } from 'src/folder/dto/create-folder.dto';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  filePath: string;

  @IsNumber()
  folderId: number;

  @IsEmpty()
  @IsObject()
  folder: object | null;
}
