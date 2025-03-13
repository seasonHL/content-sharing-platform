import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageModule } from 'src/message/message.module';
import { UserGroupModule } from 'src/user-group/user-group.module';
import { ConversationModule } from 'src/conversation/conversation.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, MessageModule, UserGroupModule, ConversationModule],
  providers: [SocketGateway]
})
export class SocketModule { }
