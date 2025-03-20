import { Controller, Post, Get, Delete, Query, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    // 添加商品到购物车
    @Post('add')
    async addToCart(
        @Query('userId') userId: number,
        @Body('productIds') productIds: number[]
    ) {
        return await this.cartService.addToCart(userId, productIds);
    }

    // 获取用户的购物车列表
    @Get('list')
    async getCartList(@Query('userId') userId: number) {
        return await this.cartService.getCartList(userId);
    }

    // 从购物车中移除商品
    @Delete('remove')
    async removeFromCart(
        @Query('cartId') cartId: number,
        @Query('productId') productId: number
    ) {
        return await this.cartService.removeFromCart(cartId, productId);
    }
}