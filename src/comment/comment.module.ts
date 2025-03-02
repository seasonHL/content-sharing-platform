import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EComment } from 'src/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EComment])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule { }
