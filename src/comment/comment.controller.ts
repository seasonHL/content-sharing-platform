import { Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ICreateComment } from 'src/types/comment';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Get('list')
    async getCommentList(@Query() query: any) {
        const { post_id, parent_comment_id } = query;
        return await this.commentService.getCommentList(post_id, parent_comment_id);
    }

    @Post('create')
    async createComment(@Query() query: ICreateComment) {
        const { post_id, parent_comment_id, user_id, comment_text } = query;
        return await this.commentService.createComment({ post_id, parent_comment_id, user_id, comment_text });
    }
}
