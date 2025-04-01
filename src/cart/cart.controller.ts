import { Controller, Post, Get, Delete, Query, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { successResponse } from 'src/utils';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // 添加商品到购物车
    @Post('add')
    async addToCart(
        @Query('userId') userId: number,
        @Body('productIds') productIds: number[]
    ) {
        const res = await this.cartService.addToCart(userId, productIds);
        return successResponse(res);
    }

    // 获取用户的购物车列表
    @Get('list')
    async getCartList(@Query('userId') userId: number) {
        const res = await this.cartService.getCartList(userId);
        return successResponse(res);
    }

    // 从购物车中移除商品
    @Delete('remove')
    async removeFromCart(
        @Query('cartId') cartId: number,
        @Query('productId') productId: number
    ) {
        const res = await this.cartService.removeFromCart(cartId, productId);
        return successResponse(res);
    }
}