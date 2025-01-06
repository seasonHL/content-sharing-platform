import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGroupModule } from 'src/user-group/user-group.module';

@Module({
  imports: [TypeOrmModule.forFeature([Group]), UserGroupModule],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule { }
