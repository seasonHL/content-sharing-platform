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
        @InjectRepository(Conversation) private readonly conversationRep: Repository<Conversation>
    ) {
        super(messageRep);
    }

    /**
     * 储存消息
     */
    async saveMessage(data: MessageData) {
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
        // 查找发送者会话id
        const { conversation_id: senderConvId } = await this.conversationRep.findOne({
            where: {
                user_id: msg.sender_id,
                friend_id: msg.receiver_id,
            }
        })
        // 发送者储存消息
        if (senderConvId) {
            this.saveMessage({ ...msg, conversation_id: senderConvId })
        }
        // 查找接收者会话id
        const { conversation_id: receiverConvId } = await this.conversationRep.findOne({
            where: {
                user_id: msg.receiver_id,
                friend_id: msg.sender_id,
            }
        })
        // 接收者储存消息
        if (receiverConvId) {
            this.saveMessage({ ...msg, conversation_id: receiverConvId })
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
