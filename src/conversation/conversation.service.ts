import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Conversation } from 'src/entities/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService extends BaseService<Conversation> {
    constructor(
        @InjectRepository(Conversation) private readonly conversationRep: Repository<Conversation>
    ) {
        super(conversationRep);
    }

    getDetails(conversation_id: number) {
        return this.conversationRep.findOne({
            relations: {
                messages: true,
            },
            where: {
                conversation_id,
            }
        });
    }
}
