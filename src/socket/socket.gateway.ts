import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'dgram';
import { Server } from 'socket.io';
import { GroupModel } from 'src/models/groups/dtos';
import { GroupService } from 'src/models/groups/group.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateWay {
  constructor(private groupService: GroupService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async findAll(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<GroupModel[]> {
    const groups = await this.groupService.getAllGroup();
    console.log('get data');
    this.server.sockets.emit('new-data', { groups });
    return groups;
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
