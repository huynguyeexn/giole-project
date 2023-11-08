import { ApiSortType } from '@common/types.common';
import { Type } from 'class-transformer';
import {
	IsEnum,
	IsInt,
	IsMongoId,
	IsOptional,
	IsString,
	MaxLength,
	Min,
} from 'class-validator';
import { QueryOptions } from 'mongoose';

export class ApiPaginateDto<T> implements QueryOptions<T> {
	@IsInt()
	@Type(() => Number)
	@IsOptional()
	offset?: number;

	@IsInt()
	@Type(() => Number)
	@Min(1)
	@IsOptional()
	limit?: number;

	@IsString()
	@IsOptional()
	@IsMongoId()
	after_id?: string;

	@IsString()
	@MaxLength(100)
	@IsOptional()
	sort_by?: string;

	@IsEnum(ApiSortType)
	@IsOptional()
	sort_type?: ApiSortType;
}
