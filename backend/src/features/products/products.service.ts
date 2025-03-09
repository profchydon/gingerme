import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { OrderProductDto } from './dto/order-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async order(dto: OrderProductDto) {
    const { productId, quantity } = dto;
    return this.prismaService.$transaction(async (prisma) => {
      const product = await prisma.products.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.stock < quantity) {
        throw new BadRequestException('Insufficient stock');
      }

      await prisma.products.update({
        where: { id: productId },
        data: { stock: product.stock - quantity },
      });

      await prisma.orders.create({
        data: {
          quantity,
          total_price: Number(product.price) * quantity, // Assuming product has a price field
          user: {
            connect: {
              id: 1, // Replace with the actual user ID
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
        },
      });

      return product;
    });
  }

  async findAllOrders() {
    return this.prismaService.orders.findMany({
      include: {
        product: {
          include: {
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
      },
      orderBy: [
        {
          created_at: 'desc',
        },
      ],
      take: 100,
    });
  }

  //TODO: improve logic : WIP
  async topSellingProducts() {
    return this.prismaService.orders.findMany({
      where: {
        created_at: {
          gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
        },
        product: {
          stock: {
            gt: 0,
          },
        },
      },
      include: {
        product: {
          include: {
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
      },
      orderBy: {
        product: {
          stock: 'desc',
        },
      },
    });
  }

  async findAll(filterDto: FindProductsQueryDto) {
    const { search, offset, limit, sort } = filterDto;
    const productWhere: Prisma.productsWhereInput = {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          brand: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
    const totalRecords = await this.prismaService.products.count({
      where: productWhere,
    });
    const products = await this.prismaService.products.findMany({
      where: productWhere,
      include: {
        brand: true,
        supplier: true,
        product_reviews: {
          select: {
            id: true,
            rating: true,
          },
        },
      },
      orderBy: [
        ...(sort?.price ? [{ price: sort.price as Prisma.SortOrder }] : []),
        ...(sort?.date ? [{ created_at: sort.date as Prisma.SortOrder }] : []),
        ...(sort?.stock ? [{ stock: sort.stock as Prisma.SortOrder }] : []),
      ],
      ...(limit && { take: +limit }),
      ...(offset && { skip: +offset }),
    });

    return {
      totalRecords,
      products,
    };
  }
}
