import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  price: string;

  @IsOptional()
  date: string;

  @IsOptional()
  stock: string;

  @IsOptional()
  @IsArray()
  sort: any;

  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  supplier?: string;

  @IsOptional()
  @IsNumber()
  minRating?: number;
}
