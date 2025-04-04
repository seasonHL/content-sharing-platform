/**
 * @author season
 * @description 帖子模块
 */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Like, Media, User } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Media, Like, User])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule { }
