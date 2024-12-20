import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormOptions } from './config';

@Module({
  imports: [TypeOrmModule.forRoot(typeormOptions), UserModule, SocketModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
