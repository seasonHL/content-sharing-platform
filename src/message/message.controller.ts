import { Body, ClassSerializerInterceptor, Controller, Get, Post, Query, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { MessageService } from './message.service';
import { successResponse } from 'src/utils';
import { Message } from 'src/entities/message.entity';

@Controller('message')
export class MessageController {
    constructor(private messageService: MessageService) { }
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: Message })
    @Get('list')
    getList() {
        return this.messageService.getMessageList();
    }
    /**
     * @param id 消息 id
     * @description 删除指定消息
     */
    @Post('delete')
    async deleteMessage(@Body('id') id: number | number[]) {
        const { affected } = await this.messageService.deleteMessage(id);
        return successResponse(`成功删除${affected}条消息`);
    }
    /**
     * @todo
     * 清空消息
     */
    @Get('clear')
    async clearMessage(@Query('user_id') user_id: number) {
        const { affected } = await this.messageService.clearMessage({
            sender_id: user_id,
        });
        return successResponse(`成功清空${affected}条消息`);
    }
    /**
     * @param data 消息数据
     * @description 储存消息
     */
    @Post('save')
    async saveMessage(@Body() data: Pick<Message, 'content' | 'receiver_id' | 'sender_id' | 'conversation_id'>) {
        if (data.receiver_id) {
            await this.messageService.saveMessage(data);
        }
    }
}
