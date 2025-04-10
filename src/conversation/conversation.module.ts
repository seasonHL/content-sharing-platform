import { Module } from '@nestjs/common';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/entities/conversation.entity';
import { MessageModule } from 'src/message/message.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), MessageModule, UserModule],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService]
})
export class ConversationModule { }
