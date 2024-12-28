/**
 * @author season
 * @description 媒体模块，帖子包含的图片或视频
 */
import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from 'src/entities/media.entity';
import { Post } from 'src/entities/post.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Media, Post])],
    providers: [MediaService],
    controllers: [MediaController],
    exports: [MediaService],
})
export class MediaModule { }
