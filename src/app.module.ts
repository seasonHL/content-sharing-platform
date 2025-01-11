import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOptions, typeormOptions } from './config';
import { PostModule } from './post/post.module';
import { MediaModule } from './media/media.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { GroupModule } from './group/group.module';
import { UserGroupModule } from './user-group/user-group.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot(configOptions), TypeOrmModule.forRoot(typeormOptions), UserModule, SocketModule, PostModule, MediaModule, AuthModule, MessageModule, GroupModule, UserGroupModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
