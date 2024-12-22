import { EMediaType } from "src/types";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('media')
export class Media {
    /** 媒体 ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    media_id: number;
    /**
     * 关联的帖子 ID
     * TypeORM 默认会使用关联实体的字段名（即 post）作为外键列的前缀，并附加一个“Id”后缀
     * 如果你没有明确指定外键列名，生成的外键列可能是 postId（而不是 post_id），即使用关联实体（Post）的名称。
     */
    @ManyToOne(() => Post, post => post.media, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'post_id' })  // 显式指定外键列名为 'post_id'
    post: Post;
    /** 媒体文件 URL（图片或视频） */
    @Column({ length: 255 })
    media_url: string;
    /** 媒体类型（图片或视频） */
    @Column({ type: 'enum', enum: ['image', 'video'] })
    media_type: EMediaType;
    /** 创建时间 */
    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}