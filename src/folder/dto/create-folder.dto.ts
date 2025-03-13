import { IsString, IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFolderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsNumber()
  parentId?: number;

  @IsString()
  path: string;
}
