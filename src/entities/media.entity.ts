import { EMediaType } from "src/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('media')
export class Media {
    /** 媒体 ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    media_id: number;
    /** 关联的帖子 ID */
    @Column()
    post_id: number;
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