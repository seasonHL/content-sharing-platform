import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from 'src/entities/conversation.entity';
import { pick, successResponse } from 'src/utils';

@Controller('conversation')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) { }
    /**
     * 创建会话
     */
    @Post('create')
    async createConversation(@Body() body: Conversation) {
        console.log(body);
        return await this.conversationService.saveOne(body);
    }
    /**
     * 获取会话列表
     */
    @Get('list')
    async getConversationList(@Query('user_id') user_id: number) {
        let list = [];
        if (user_id) {
            list = await this.conversationService.findMany({
                where: {
                    user_id
                }
            });
        } else {
            list = await this.conversationService.findAll();
        }
        return successResponse(list);
    }
    /**
     * 获取会话详情
     */
    @Get('detail')
    async getConversationDetail(@Query('id') conversation_id: number) {
        return await this.conversationService.getDetails(conversation_id);
    }
    /**
     * 删除会话
     */
    @Post('delete')
    async deleteConversation(@Body('id') conversation_id: number) {
        return await this.conversationService.delete({
            conversation_id
        });
    }
    /**
     * 更新会话
     */
    @Post('update')
    async updateConversation(@Body() body: Conversation) {
        await this.conversationService.update(pick(body, ['conversation_id']), body);
        return successResponse('更新成功');
    }
}
