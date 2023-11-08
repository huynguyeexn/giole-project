import { FindAllResponse } from '@common/types.common';

export interface Write<T> {
	create(item: T | any): Promise<T>;
	update(id: string, item: Partial<T>): Promise<T>;
	remove(id: string): Promise<boolean>;
}

export interface Read<T> {
	findAll(
		options?: object,
		filter?: object,
		projection?: string | object,
	): Promise<FindAllResponse<T>>;
	findOne(id: string): Promise<T>;
	findOneByCondition(filter: Partial<T>): Promise<T>;
}

export interface BaseServiceInterface<T> extends Write<T>, Read<T> {}
