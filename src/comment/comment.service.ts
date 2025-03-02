import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { EComment } from 'src/entities/comment.entity';
import { ICreateComment } from 'src/types/comment';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService extends BaseService<EComment> {

    constructor(
        @InjectRepository(EComment) private readonly commentRep: Repository<EComment>

    ) {
        super(commentRep);
    }

    async getCommentList(post_id: number, parent_comment_id: number) {
        return await this.commentRep.find({
            where: {
                post_id,
                parent_comment_id
            }
        })
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

    async createComment({
        post_id,
        parent_comment_id,
        user_id,
        comment_text
    }: ICreateComment) {
        const comment = this.commentRep.create({
            post_id,
            parent_comment_id,
            user_id,
            comment_text,
        })
        return await this.commentRep.save(comment);
    }
}
