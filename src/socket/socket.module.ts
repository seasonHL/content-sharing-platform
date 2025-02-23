import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageModule } from 'src/message/message.module';
import { UserGroupModule } from 'src/user-group/user-group.module';
import { ConversationModule } from 'src/conversation/conversation.module';

@Module({
  imports: [MessageModule, UserGroupModule, ConversationModule],
  providers: [SocketGateway]
})
export class SocketModule { }
