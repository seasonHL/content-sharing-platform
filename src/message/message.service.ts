import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Conversation, Post as PostEntity } from 'src/entities';
import { Message } from 'src/entities/message.entity';
import { MessageData } from 'src/types/socket';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService extends BaseService<Message> {
    constructor(
        @InjectRepository(Message) private readonly messageRep: Repository<Message>,
        @InjectRepository(PostEntity) private readonly postRep: Repository<PostEntity>,
        @InjectRepository(Conversation) private readonly conversationRep: BaseService<Conversation>
    ) {
        super(messageRep);
    }

    /**
     * 储存消息
     */
    async saveMessage(data: Pick<Message, 'content' | 'receiver_id' | 'sender_id' | 'conversation_id'>) {
        const { conversation_id, } = data
        if (conversation_id) {
            this.messageRep.save(data)
            this.conversationRep.update({ conversation_id }, {
                last_message: data.content,
                updated_at: new Date(),
            })
        }
        return true
    }
    async receiveMessage(msg: MessageData & Pick<Message, 'sender_id' | 'receiver_id'>) {
        // 发送者储存消息
        this.saveMessage(msg)
        // 查找会话id
        const { conversation_id } = await this.conversationRep.findOne({
            user_id: msg.receiver_id,
            friend_id: msg.sender_id,
        })
        // 接收者储存消息
        if (conversation_id && msg.conversation_id !== conversation_id) {
            this.saveMessage({ ...msg, conversation_id })
        }
    }
    /**
     * 清空消息
     */
    async clearMessage(data: Partial<Pick<Message, 'receiver_id' | 'sender_id'>>) {
        return await this.messageRep.delete(data)
    }
    /**
     * 删除指定消息
     */
    async deleteMessage(id: number | number[]) {
        return await this.messageRep.delete(id)
    }
    /**
     * 获取消息列表
     */
    async getMessageList({ page = 1, limit = 40, ...data }: Partial<Message> & {
        page?: number,
        limit?: number,
    } = {}) {
        const skip = (page - 1) * limit;
        const list = await this.messageRep.find({
            where: data,
            take: limit,
            skip: skip,
            order: {
                createdAt: 'DESC'
            }
        })
        list.reverse()
        return Promise.all(list.map(async item => {
            const { post_id } = item
            if (post_id) {
                const post = await this.postRep.findOne({
                    relations: { media: true },
                    where: { post_id }
                })
                return { ...item, post }
            }
            return item
        }))
    }
}
