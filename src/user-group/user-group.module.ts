import { Module } from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroup } from 'src/entities';
import { UserGroupController } from './user-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserGroup])],
  providers: [UserGroupService],
  exports: [UserGroupService],
  controllers: [UserGroupController],
})
export class UserGroupModule { }
