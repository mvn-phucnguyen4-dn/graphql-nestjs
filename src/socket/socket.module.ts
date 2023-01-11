import { Module } from '@nestjs/common';
import { SocketGateWay } from './socket.gateway';
import { GroupModule } from 'src/models/groups/group.module';

@Module({
  imports: [GroupModule],
  providers: [SocketGateWay],
})
export class SocketModule {}
