import { Controller, Get, Post, Delete, Param, Body, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Folder } from './entities/folder.entity';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';

@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  async createFolder(@Body() body: CreateFolderDto): Promise<Folder> {
    try {
      return await this.folderService.createFolder(body);
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create folder',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('tree')
  async getSubfolders(@Param('path') path: string): Promise<Folder[]> {
    try {
      return await this.folderService.getTree();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to get folder tree',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async deleteFolder(@Param('id') id: number): Promise<void> {
    try {
      await this.folderService.deleteFolder(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; 
      }
      throw new HttpException(
        error.message || 'Failed to delete folder',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
