import { BaseEntity } from '@common/entity/base.entity';
import { BaseRepositoryInterface } from '@common/repositories/base.interface.repository';
import { ApiSortType, FindAllResponse } from '@common/types.common';
import { BaseServiceInterface } from './base.interface.service';
import {
	FilterQuery,
	ProjectionType,
	QueryOptions,
	isValidObjectId,
} from 'mongoose';
import { ApiPaginateDto } from '@common/dto/paginate.dto';

export abstract class BaseServiceAbstract<T extends BaseEntity>
	implements BaseServiceInterface<T>
{
	constructor(private readonly repository: BaseRepositoryInterface<T>) {}

	async create(create_dto: T | any): Promise<T> {
		return await this.repository.create(create_dto);
	}

	async findAll(
		query?: ApiPaginateDto<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<FindAllResponse<T>> {
		const sort = query.sort_by
			? {
					[query.sort_by]: query.sort_type === ApiSortType.asc ? 1 : -1,
			  }
			: {};

		const remapQuery: QueryOptions<T> = {
			limit: query.limit || 10,
			skip: query.offset || 0,
			sort,
		};

		if (query.after_id) {
			filter = {
				_id: {
					$gt: query.after_id,
				},
				...filter,
			};
		}

		return await this.repository.findAll(remapQuery, filter, projection);
	}
	async findOne(id: string) {
		return await this.repository.findOneById(id);
	}

	async findOneByCondition(
		query?: QueryOptions<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	) {
		return await this.repository.findOneByCondition(query, filter, projection);
	}

	async update(id: string, update_dto: Partial<T>) {
		return await this.repository.update(id, update_dto);
	}

	async remove(id: string) {
		return await this.repository.softDelete(id);
	}
}
