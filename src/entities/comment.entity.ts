import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Post } from 'src/entities';

class CommentRelation {
    /** 用户实体，多对一关系 */
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User
    /** 帖子实体，一对多关系 */
    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' }) // 新增与 Post 实体的关联
    @JoinColumn({ name: 'post_id' })
    post: Post;
}

@Entity('comments')
export class EComment extends CommentRelation {
    /* 评论ID，自增长，主键*/
    @PrimaryGeneratedColumn()
    comment_id: number;
    /* 帖子ID，外键，关联到Post实体的post_id字段*/
    @Column({ nullable: true })
    post_id: number;
    /* 用户ID，外键，关联到User实体的user_id字段*/
    @Column()
    user_id: number;
    /* 父评论ID，外键，关联到自身的comment_id字段，用于表示回复的评论*/
    @Column({ nullable: true })
    parent_comment_id: number;
    /* 评论内容，文本类型*/
    @Column({ type: 'text' })
    comment_text: string;
    /* 评论时间，时间戳类型，默认为当前时间*/
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    /* 更新时间，时间戳类型，自动更新*/
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    /** 父评论实体，多对一关系 */
    @ManyToOne(() => EComment, (comment) => comment.replies, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'parent_comment_id' })
    parentComment: EComment;
    /** 子评论实体，一对多关系 */
    @OneToMany(() => EComment, (comment) => comment.parentComment)
    replies: EComment[];
}