import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MediaModule } from 'src/media/media.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/entities';

@Module({
  imports: [MediaModule, TypeOrmModule.forFeature([Media])],
  controllers: [UploadController]
})
export class UploadModule { }
