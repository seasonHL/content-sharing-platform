import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { EComment } from 'src/entities/comment.entity';
import { ICreateComment } from 'src/types/comment';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CommentService extends BaseService<EComment> {

    constructor(
        @InjectRepository(EComment) private readonly commentRep: Repository<EComment>

    ) {
        super(commentRep);
    }

    /**
     * 获取评论列表
     */
    async getComments(postId: number) {
        return this.commentRep.find({
            // 只查询顶级评论，即 parent_comment_id 为 null 的评论
            where: { post_id: postId, parent_comment_id: IsNull() },
            relations: ['user', 'replyList'],
        });
    }

    /**
     * 获取指定评论的回复列表
     * @param commentId - 评论的 ID
     * @returns 返回指定评论的回复列表
     */
    async getReplies(commentId: number) {
        return this.commentRep.find({
            where: { parent_comment_id: commentId },
            relations: ['user', 'replyList', 'targetComment', 'targetComment.user'],
        });
    }
    /**
     * 获取指定帖子的评论数量
     * @param post_id - 帖子的 ID
     * @returns 返回指定帖子的评论数量
     */
    async getCommentCount(post_id: number) {
        // 调用 commentRep 的 count 方法，根据 post_id 统计评论数量
        return await this.commentRep.count({
            where: {
                post_id
            }
        })
    }

    async createComment(data: ICreateComment) {
        try {
            const comment = this.commentRep.create(data)
            return await this.commentRep.save(comment);
        } catch (error) {
            return error;
        }
    }
}
