import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Response } from 'src/common/metadata/response.metadata';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get('latest')
  @Response({
    status: HttpStatus.OK,
    message: 'Latest orders fetched successfully',
  })
  getLatestOrders() {
    return this.ordersService.getLatestOrders();
  }
}