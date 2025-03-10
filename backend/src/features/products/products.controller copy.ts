// import { Controller, Get, Post, Body, Query, HttpStatus } from '@nestjs/common';

// import { ProductsService } from './products.service';
// import { OrderProductDto } from './dto/order-product.dto';
// import { FindProductsQueryDto } from './dto/find-products-query.dto';
// import { Response } from 'src/common/metadata/response.metadata';

// @Controller('products')
// export class ProductsController {
//   constructor(private readonly productsService: ProductsService) {}

//   @Post('orders')
//   @Response({
//     status: HttpStatus.OK,
//     message: 'product ordered successfully',
//   })
//   create(@Body() createProductDto: OrderProductDto) {
//     return this.productsService.order(createProductDto);
//   }

//   @Get('orders')
//   @Response({
//     status: HttpStatus.OK,
//     message: 'orders fetched successfully',
//   })
//   findAllOrders() {
//     return this.productsService.findAllOrders();
//   }

//   @Get('top-selling')
//   @Response({
//     status: HttpStatus.OK,
//     message: 'top products fetched successfully',
//   })
//   findTopProducts() {
//     return this.productsService.topSellingProducts();
//   }

//   @Get()
//   @Response({
//     status: HttpStatus.OK,
//     message: 'products fetched successfully',
//   })
//   findAll(@Query() query: FindProductsQueryDto) {
//     return this.productsService.findAll(query);
//   }
// }
