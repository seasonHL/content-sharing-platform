/**
 * @author season
 * @description 帖子模块
 */
import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post, Like, Media, User, Conversation } from 'src/entities';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Media, Like, User, Conversation]), MessageModule],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule { }
