/**
 * @author season
 * @description 帖子模块
 */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Media } from 'src/entities/media.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Media])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule { }
