import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from 'src/entities/conversation.entity';
import { successResponse } from 'src/utils';

@Controller('conversation')
export class ConversationController {
    constructor(private readonly conversationService: ConversationService) { }
    /**
     * 创建会话
     */
    @Post('create')
    async createConversation(@Body() body: Conversation) {
        return await this.conversationService.createConversation(body);
    }
    /**
     * 获取会话列表
     */
    @Get('list')
    async getConversationList(@Req() req) {
        const { user_id } = req.user;
        const res = await this.conversationService.getConversationList(user_id);
        return successResponse(res);
    }
    /**
     * 获取会话详情
     */
    @Get('detail')
    async getConversationDetail(@Query('id') conversation_id: number) {
        const res = await this.conversationService.getDetails(conversation_id);
        return successResponse(res);
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
        const { conversation_id } = body;
        await this.conversationService.update(conversation_id, body);
        return successResponse('更新成功');
    }
}
