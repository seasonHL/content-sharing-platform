import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { MessageService } from 'src/message/message.service';
@WebSocketGateway()
export class SocketGateway {
  constructor(private readonly jwtService: JwtService, private readonly msgService: MessageService) { }
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data, @ConnectedSocket() client: Socket) {
    const token = client.handshake.auth.token || client.handshake.query.token;
    if (!token) {
      return;
    }
    // 验证token
    const payload = await this.jwtService.verifyAsync(token);
    // 储存消息
    this.msgService.saveMessage({
      content: data.content,
      receiver_id: data.receiver_id,
      sender_id: payload.user_id
    })
    // 广播消息
    // this.server.emit('message', data);
    client.broadcast.emit('message', data);
    // 发送给指定用户
    this.server.to(data.receiver_id.toString()).emit('message', data);
  }

  @SubscribeMessage('heartbeat')
  handleHeartbeat(@ConnectedSocket() client) {
    client.emit('heartbeat', 'heartbeat');
  }
}
