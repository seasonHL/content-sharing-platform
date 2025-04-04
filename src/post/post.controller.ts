import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, Req, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePost } from 'src/types/post';
import { successResponse } from 'src/utils';
import { PostDto } from 'src/entities/post.entity';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: PostDto })
    @Get('list')
    async getPostList(@Query() query) {
        const { page = 1, limit = 10 } = query;
        const posts = await this.postService.getPostList(page, limit);
        return posts;
    }

    @Post('create')
    async createPost(@Body() data: ICreatePost) {
        return await this.postService.createPostWithMedia(data);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: PostDto })
    @Get('detail')
    async getPostDetail(@Req() req, @Query('post_id') postId: number) {
        const userId = req.user['user_id'];
        return await this.postService.getPostById(userId, postId);
    }

    @Post('like')
    async likePost(@Body('postId') postId: number, @Req() req) {
        const userId = req.user['user_id'];
        const result = await this.postService.likePost(postId, userId);
        return successResponse(result);
    }

    @Post('unlike')
    async unlikePost(@Body('postId') postId: number, @Req() req) {
        const userId = req.user['user_id'];
        const result = await this.postService.unlikePost(postId, userId);
        return successResponse(result);
    }

    @Get('likeCount')
    async getLikeCount(@Param('postId') postId: number) {
        const count = await this.postService.getLikeCount(postId);
        return successResponse(count);
    }

    @Post('comment')
    async commentPost() {
        return await this.postService.commentPost();
    }

    @Post('share')
    async sharePost() {
        return await this.postService.sharePost();
    }

    @Post('delete')
    async deletePost(@Query('post_id') post_id: number) {
        return await this.postService.deletePost(post_id);
    }
}
