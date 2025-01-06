import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import type { Server, Socket } from 'socket.io';
import { jwtOptions } from 'src/config';
import { MessageService } from 'src/message/message.service';
import { MessageData } from 'src/types/socket';
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  /** 注入socket服务 */
  @WebSocketServer()
  server: Server;
  /** 用户ID到socket.id的映射 */
  private users: Map<number, string> = new Map();
  constructor(private readonly jwtService: JwtService, private readonly msgService: MessageService) { }
  handleConnection(@ConnectedSocket() socket: Socket) {
    try {
      // 验证token
      const token = socket.handshake.auth.token || socket.handshake.query.token;
      if (!token) {
        throw new Error('unauthorized')
      }
      Logger.log(`client connected: ${socket.id}`, 'SocketGateway')
      // 验证token
      const payload = this.jwtService.verify(token, jwtOptions);
      // 储存用户id
      socket.data.user_id = payload.user_id;
      this.users.set(payload.user_id, socket.id);
    } catch (error) {
      Logger.error(error, 'SocketGateway')
      socket.disconnect();
    }
  }
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    Logger.log(`client disconnected: ${socket.id}`, 'SocketGateway')
    // 移除用户id
    this.users.delete(socket.data.user_id);
  }
  /**
   * @description 私聊消息
   */
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageData, @ConnectedSocket() client: Socket) {
    const user_id = client.data.user_id;
    const msg = {
      ...data,
      sender_id: user_id
    }
    // 储存消息
    this.msgService.saveMessage(msg)
    // 查找接收者的socket.id
    const receiverSocketId = this.users.get(data.receiver_id);
    if (receiverSocketId) {
      // 通过 receiverSocketId 向接收者发送消息
      this.server.to(receiverSocketId).emit('message', msg);
    } else {
      // 如果接收者没有在线，可以选择存储离线消息等
      Logger.log(`User is offline: ${data.receiver_id}`, 'SocketGateway')
    }
  }
  /**
   * @todo 群聊消息
   */
  @SubscribeMessage('group')
  async handleGroupMessage() { }

  /**
   * @description 心跳消息
   */
  @SubscribeMessage('heartbeat')
  handleHeartbeat(@ConnectedSocket() client: Socket) {
    client.emit('heartbeat', 'heartbeat');
  }
}
