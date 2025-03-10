import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ProductsModule } from './features/products/products.module';
import { ProductsController } from './features/products/products.controller';
import { ProductsService } from './features/products/products.service';
import { OrdersModule } from './features/orders/orders.module';
import { OrdersController } from './features/orders/orders.controller';
import { OrdersService } from './features/orders/orders.service';

@Module({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  imports: [ProductsModule, OrdersModule],
  controllers: [AppController, ProductsController, OrdersController],
  providers: [
    AppService,
    ProductsService,
    OrdersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
