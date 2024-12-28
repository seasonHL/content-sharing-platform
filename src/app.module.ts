import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions, typeormOptions } from './config';
import { PostModule } from './post/post.module';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(configOptions), TypeOrmModule.forRoot(typeormOptions), UserModule, SocketModule, PostModule, MediaModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
