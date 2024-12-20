import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class SocketGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data, @ConnectedSocket() client) {
    Logger.log(data, 'message')
    Logger.log(client.id, 'client.id')
  }

  @SubscribeMessage('heartbeat')
  handleHeartbeat(@ConnectedSocket() client) {
    client.emit('heartbeat', 'heartbeat');
  }
}
