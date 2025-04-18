import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Query, Req, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { ICreatePost } from 'src/types/post';
import { successResponse } from 'src/utils';
import { PostDto, PostListDto } from 'src/entities/post.entity';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: PostListDto })
    @Get('list')
    /**
     * 获取帖子列表
     * @param query - 查询参数，包含分页信息
     * @returns 返回帖子列表
     */
    async getPostList(@Query() query) {
        const { page = 1, limit = 10, authorId } = query;
        const posts = await (authorId ? this.postService.getPostsByUserId(authorId) : this.postService.getPostList(page, limit));
        return successResponse(posts);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: PostDto })
    @Get('search')
    async searchPost(@Query() query) {
        const { page = 1, limit = 10, keyword } = query;
        const posts = await this.postService.searchPost(keyword, page, limit);
        return successResponse(posts);
    }

    @Post('create')
    /**
     * 创建帖子
     * @param data - 创建帖子所需的数据，类型为 ICreatePost
     * @returns 返回创建帖子的结果
     */
    async createPost(@Body() data: ICreatePost) {
        return await this.postService.createPostWithMedia(data);
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: PostDto })
    @Get('detail')
    /**
     * 获取帖子详情
     * @param req - 请求对象，包含用户信息
     * @param postId - 帖子的ID，从查询参数中获取
     * @returns 返回指定帖子的详细信息
     */
    async getPostDetail(@Req() req, @Query('post_id') postId: number) {
        const userId = req.user['user_id'];
        const res = await this.postService.getPostById(userId, postId);
        return successResponse(res);
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
    async sharePost(@Req() req, @Body() body) {
        const sender_id = req.user['user_id'];
        const { receiver_id, post_id } = body;
        await this.postService.sharePost(sender_id, receiver_id, post_id);
        return successResponse('帖子转发成功');
    }

    @Post('delete')
    async deletePost(@Query('post_id') post_id: number) {
        return await this.postService.deletePost(post_id);
    }
}
