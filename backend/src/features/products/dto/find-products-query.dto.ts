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
}
