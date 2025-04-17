import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/entities';
import { successResponse } from 'src/utils';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('create')
    async createProduct(@Body() product: Product) {
        const res = await this.productService.createProduct(product);
        return successResponse(res);
    }

    @Get('list')
    async getProductList() {
        const list = await this.productService.getProductList();
        return successResponse(list);
    }

    @Get('search')
    async searchProduct(@Query('keyword') keyword: string) {
        const list = await this.productService.searchProduct(keyword);
        return successResponse(list);
    }

    @Get('detail')
    async getProductDetail(@Query('id') id: number) {
        const product = await this.productService.getProductDetail(id);
        return successResponse(product);
    }

    @Post('update')
    async updateProduct(@Body('id') id: number, @Body() product: Product) {
        return await this.productService.updateProduct(id, product);
    }

    @Post('delete')
    async deleteProduct(@Body('id') id: number) {
        return await this.productService.deleteProduct(id);
    }
}
