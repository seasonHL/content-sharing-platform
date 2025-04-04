import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { ConversationService } from 'src/conversation/conversation.service';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService extends BaseService<Message> {
    constructor(
        @InjectRepository(Message) private readonly messageRep: Repository<Message>,
        private readonly conversationService: ConversationService,
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
            this.conversationService.update({ conversation_id }, {
                last_message: data.content,
                updated_at: new Date(),
            })
        }
        return true
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
    async getMessageList(data: Pick<Message, 'receiver_id' | 'sender_id'>) {
        return await this.messageRep.find({
            where: data,
            order: {
                createdAt: 'DESC'
            }
        })
    }
}
