import { FindAllResponse } from '@common/types.common';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export interface BaseRepositoryInterface<T> {
	create(dto: T | any): Promise<T>;

	findOneById(
		id: string,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<T>;

	findOneByCondition(
		condition?: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<T>;

	findAll(
		condition?: object,
		projection?: string | object,
		options?: object,
	): Promise<FindAllResponse<T>>;

	update(id: string, dto: Partial<T>): Promise<T>;

	softDelete(id: string): Promise<boolean>;

	permanentlyDelete(id: string): Promise<boolean>;
}
