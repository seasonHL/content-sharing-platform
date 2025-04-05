import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Conversation } from 'src/entities/conversation.entity';
import { MessageService } from 'src/message/message.service';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService extends BaseService<Conversation> {
    constructor(
        @InjectRepository(Conversation) private readonly conversationRep: Repository<Conversation>,
        private readonly messageService: MessageService,
    ) {
        super(conversationRep);
    }

    async getDetails(conversation_id: number) {
        const conversation = await this.conversationRep.findOne({
            where: {
                conversation_id,
            }
        });
        const messages = await this.messageService.getMessageList({ conversation_id })
        return { ...conversation, messages };
    }
}
