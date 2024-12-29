import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [SocketGateway]
})
export class SocketModule { }
