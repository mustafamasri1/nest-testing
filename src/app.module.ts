import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './folder/folder.module';
import { DocumentModule } from './document/document.module';
import { UsersModule } from './users/users.module';
import { AccesscontrolModule } from './accesscontrol/accesscontrol.module';
import { Users } from './users/entities/users.entity';
import { Folder } from './folder/entities/folder.entity';
import { Document } from './document/entities/document.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1234',
      username: 'postgres',
      entities: [Users, Folder, Document],
      database: 'ltree-task',
      synchronize: true,
      logging: true,
    }),
    FolderModule,
    DocumentModule,
    UsersModule,
    AccesscontrolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
