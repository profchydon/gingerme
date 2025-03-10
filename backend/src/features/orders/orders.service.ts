import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async getLatestOrders() {
    const orders = await this.prismaService.orders.findMany({
      take: 100,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        product: {
          include: {
            category: true,
            brand: true,
            supplier: true,
            product_reviews: {
              select: {
                id: true,
                rating: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return orders;
  }
}
