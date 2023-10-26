import { BaseEntity } from '@common/entity/base.entity';
import { BaseRepositoryInterface } from '@common/repositories/base.interface.repository';
import { FindAllResponse } from '@common/types.common';
import { BaseServiceInterface } from './base.interface.service';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export abstract class BaseServiceAbstract<T extends BaseEntity>
	implements BaseServiceInterface<T>
{
	constructor(private readonly repository: BaseRepositoryInterface<T>) {}

	async create(create_dto: T | any): Promise<T> {
		return await this.repository.create(create_dto);
	}

	async findAll(
		condition?: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<FindAllResponse<T>> {
		return await this.repository.findAll(condition, projection, options);
	}
	async findOne(id: string) {
		return await this.repository.findOneById(id);
	}

	async findOneByCondition(
		condition?: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	) {
		return await this.repository.findOneByCondition(
			condition,
			projection,
			options,
		);
	}

	async update(id: string, update_dto: Partial<T>) {
		return await this.repository.update(id, update_dto);
	}

	async remove(id: string) {
		return await this.repository.softDelete(id);
	}
}
