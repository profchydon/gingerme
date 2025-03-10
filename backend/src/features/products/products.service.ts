import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';
import { FindProductsQueryDto } from './dto/find-products-query.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async getTopSellingProducts(query: FindProductsQueryDto) {
    const { page = 1, limit, brand, supplier } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(brand && { brand: { name: brand } }),
      ...(supplier && { supplier: { name: supplier } }),
    };

    // Aggregate total quantity sold for each product
    const topSellingProducts = await this.prismaService.orders.groupBy({
      by: ['product_id'],
      _sum: {
        quantity: true,
      },
      where: {
        product: where, // Apply brand and supplier filters
      },
      orderBy: {
        _sum: {
          quantity: 'desc', // Sort by total quantity sold (descending)
        },
      },
      take: Number(limit),
      skip,
    });

    // Fetch product details for the top-selling products
    const productIds = topSellingProducts.map((item) => item.product_id);
    const products = await this.prismaService.products.findMany({
      where: {
        id: { in: productIds },
      },
      include: {
        category: true,
        brand: true,
        supplier: true,
      },
    });

    // Map the total quantity sold to each product
    const productsWithQuantity = products.map((product) => {
      const foundItem = topSellingProducts.find(
        (item) => item.product_id === product.id,
      );

      // Handle the case where no matching item is found
      const quantitySold = foundItem ? foundItem._sum.quantity : 0;

      return {
        ...product,
        total_quantity_sold: quantitySold,
      };
    });

    // Count total products for pagination
    const total = await this.prismaService.orders.groupBy({
      by: ['product_id'],
      where: {
        product: where,
      },
    });

    return {
      data: productsWithQuantity,
      meta: {
        total: total.length,
        page,
        limit,
        totalPages: Math.ceil(total.length / limit),
      },
    };
  }

  async getProducts(filterDto: FindProductsQueryDto) {
    const { search, offset, limit, sort } = filterDto;

    const productWhere: Prisma.productsWhereInput = {
      OR: search
        ? [
            { name: { contains: search, mode: 'insensitive' } },
            { category: { name: { contains: search, mode: 'insensitive' } } },
            { brand: { name: { contains: search, mode: 'insensitive' } } },
          ]
        : undefined,
    };

    const sortMappings: Record<string, string> = {
      price: 'price',
      date: 'created_at',
      stock: 'stock',
    };

    const orderByConditions: Prisma.productsOrderByWithRelationInput[] =
      sort && typeof sort === 'object'
        ? Object.entries(sort).map(([key, value]) => ({
            [sortMappings[key] || key]: value as Prisma.SortOrder,
          }))
        : [];

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
      orderBy:
        orderByConditions.length > 0
          ? orderByConditions
          : [{ created_at: 'desc' }],
      take: limit ? Number(limit) : undefined,
      skip: offset ? Number(offset) : undefined,
    });

    return {
      totalRecords,
      products,
    };
  }
}
