import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { successResponse } from 'src/utils';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }
    @Get('list')
    getList() {
        return this.messageService.findAll();
    }
    /**
     * 删除指定消息
     */
    @Get('delete')
    async deleteMessage(id: number | number[]) {
        const { affected } = await this.messageService.deleteMessage(id);
        return successResponse(`成功删除${affected}条消息`);
    }
    /**
     * 清空消息
     */
    @Get('clear')
    async clearMessage(@Query('user_id') user_id: number) {
        const { affected } = await this.messageService.clearMessage({
            sender_id: user_id,
        });
        return successResponse(`成功清空${affected}条消息`);
    }
}
