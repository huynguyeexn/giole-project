import { FindAllResponse } from '@common/types.common';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export interface BaseRepositoryInterface<T> {
	create(dto: T | any): Promise<T>;

	insertMany(dto: T[] | any): Promise<any>;

	findOneById(
		id: string,
		query?: QueryOptions<T>,
		projection?: ProjectionType<T>,
	): Promise<T>;

	findOneByCondition(
		query?: QueryOptions<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<T>;

	findAll(
		query?: QueryOptions<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<FindAllResponse<T>>;

	update(id: string, dto: Partial<T>): Promise<T>;

	softDelete(id: string): Promise<boolean>;

	permanentlyDelete(id: string): Promise<boolean>;
}
