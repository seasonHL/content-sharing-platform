import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormOptions } from './config';
import { PostModule } from './post/post.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeormOptions), UserModule, SocketModule, PostModule, MediaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
