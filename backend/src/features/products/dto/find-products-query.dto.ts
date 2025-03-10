import { IsEnum, IsNumber, IsOptional } from 'class-validator';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class FindProductsQuerySortDto {
  @IsEnum(SortOrder)
  price: string;

  @IsEnum(SortOrder)
  date: string;

  @IsEnum(SortOrder)
  stock: string;
}
export class FindProductsQueryDto {
  @IsOptional()
  search: string;

  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;

  @IsOptional()
  sort: FindProductsQuerySortDto;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  brand?: string;

  @IsOptional()
  supplier?: string;

  @IsOptional()
  @IsNumber()
  minRating?: number;
}
