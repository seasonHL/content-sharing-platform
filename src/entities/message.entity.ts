import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

export class MessageRelation {
    /** 关联的用户 */
    @Exclude()// 排除该属性
    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, (user) => user.messages)
    user: User;
}

/** 消息实体类 */
@Entity('messages')
export class Message extends MessageRelation {
    /** 消息 ID，自增长，主键 */
    @PrimaryGeneratedColumn()
    id: number;
    /** 发送者 ID */
    @Column()
    sender_id: number;
    /** 接收者 ID */
    @Column({ nullable: true })
    receiver_id: number;
    /** 群组 ID */
    @Column({ nullable: true })
    group_id: number
    /** 消息内容 */
    @Column()
    content: string;
    /** 消息发送时间 */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    /** 消息状态 */
    @Column({ default: false })
    isRead: boolean;
    /** 关联的用户 ID */
    @Column({ name: 'user_id' })
    user_id: number;
}
