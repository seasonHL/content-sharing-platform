import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductModule } from 'src/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Product } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Product]), ProductModule],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }
