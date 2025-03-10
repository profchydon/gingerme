import { Controller, Get, Post, Body, Query, HttpStatus } from '@nestjs/common';

import { ProductsService } from './products.service';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { Response } from 'src/common/metadata/response.metadata';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Response({
    status: HttpStatus.OK,
    message: 'products fetched successfully',
  })
  public async getProducts(@Query() query: FindProductsQueryDto) {
    return await this.productsService.getProducts(query);
  }

  @Get('top-selling')
  @Response({
    status: HttpStatus.OK,
    message: 'Top-selling products fetched successfully',
  })
  getTopSellingProducts(@Query() query: FindProductsQueryDto) {
    return this.productsService.getTopSellingProducts(query);
  }
}
