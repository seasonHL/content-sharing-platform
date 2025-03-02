import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePost } from 'src/types/post';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @Get('list')
    async getPostList(@Query('user_id') user_id: number) {
        if (user_id) {
            return await this.postService.getPostsByUserId(user_id);
        }
        return await this.postService.getAllPosts();
    }

    @Post('create')
    async createPost(@Body() data: ICreatePost) {
        return await this.postService.createPostWithMedia(data);
    }

    @Get('detail')
    async getPostDetail(@Query('post_id') post_id: number) {
        return await this.postService.getPostById(post_id);
    }

    @Post('like')
    async likePost() {
        return await this.postService.likePost();
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
