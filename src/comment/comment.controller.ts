import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ICreateComment } from 'src/types/comment';
import { successResponse } from 'src/utils';
import { EComment } from 'src/entities/comment.entity';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: EComment })
    @Get('list')
    async getCommentList(@Query('post_id') post_id: number) {
        const data = await this.commentService.getComments(post_id);
        return successResponse(data);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: EComment })
    @Get('replies')
    async getReplies(@Query('comment_id') comment_id: number) {
        const data = await this.commentService.getReplies(comment_id);
        return successResponse(data);
    }

    @Post('create')
    async createComment(@Body() body: ICreateComment) {
        const comment = await this.commentService.createComment(body);
        return successResponse(comment);
    }
}
