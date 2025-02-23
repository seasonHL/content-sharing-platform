import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conversation } from './conversation.entity';

export class MessageRelation {
    /** 关联的会话 */
    @JoinColumn({ name: 'conversation_id' })
    @ManyToOne(() => Conversation, (user) => user.messages)
    conversation: Conversation;
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
    /** 会话 ID */
    @Column({ name: 'conversation_id' })
    conversation_id: number;
}
