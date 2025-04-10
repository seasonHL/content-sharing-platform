import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Conversation } from 'src/entities/conversation.entity';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService extends BaseService<Conversation> {
    constructor(
        @InjectRepository(Conversation) private readonly conversationRep: Repository<Conversation>,
        private readonly messageService: MessageService,
        private readonly userService: UserService
    ) {
        super(conversationRep);
    }

    async createConversation(conversation: Conversation) {
        const { friend_id } = conversation;
        // 检查是否已经存在相同的会话
        const exist = await this.conversationRep.findOne({ where: { friend_id } });
        if (exist) {
            // 如果存在，则返回已存在的会话信息
            return exist;
        }
        // 如果不存在，则创建新的会话
        const friend = await this.userService.findByUserId(friend_id);
        if (friend) {
            // 如果好友存在，则创建新的会话并返回会话信息
            const newConversation = {
                ...conversation,
                avatar: friend.avatar,
                title: conversation.title || friend.username,
            }
            return await this.conversationRep.save(newConversation);
        }
    }

    /**
     * 获取指定会话的详细信息
     * @param conversation_id - 会话的ID
     * @returns 返回包含会话信息和该会话下所有消息的对象
     */
    async getDetails(conversation_id: number) {
        // 根据会话ID查找会话信息
        const conversation = await this.conversationRep.findOne({
            where: {
                conversation_id,
            }
        });
        // 根据会话ID获取该会话下的所有消息
        const messages = await this.messageService.getMessageList({ conversation_id })
        // 将会话信息和消息合并返回
        return { ...conversation, messages };
    }

    /**
     * 获取会话列表
     * @param user_id - 用户的ID，如果提供则返回该用户的会话列表，否则返回所有会话列表
     * @returns 返回会话列表
     */
    async getConversationList(user_id: number) {
        // 初始化会话列表为空数组
        let list = [];
        // 检查 user_id 是否存在
        if (user_id) {
            // 如果 user_id 存在，则查找该用户的所有会话
            list = await this.conversationRep.find({
                where: {
                    user_id,
                }
            });
        } else {
            // 如果 user_id 不存在，则查找所有会话
            list = await this.conversationRep.find();
        }
        // 返回会话列表
        return list;
    }
}