import { FindAllResponse } from '@common/types.common';
import { BaseEntity } from '@common/entity/base.entity';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { BaseRepositoryInterface } from './base.interface.repository';

export abstract class BaseRepositoryAbstract<T extends BaseEntity>
	implements BaseRepositoryInterface<T>
{
	protected constructor(private readonly model: Model<T>) {
		this.model = model;
	}

	async create(dto: T | any): Promise<T | any> {
		const created_data = await this.model.create(dto);
		const result = await created_data.save();
		return result;
	}

	async insertMany(dto: T[] | any): Promise<any> {
		const result = await this.model.insertMany(dto);
		return result;
	}

	async findOneById(
		id: string,
		query?: QueryOptions<T>,
		projection?: ProjectionType<T>,
	): Promise<T> {
		const item = await this.model.findById(id, projection, query).exec();
		return item.deleted_at ? null : item;
	}

	async findOneByCondition(
		query?: QueryOptions<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<T> {
		return await this.model
			.findOne(
				{
					deleted_at: null,
					...filter,
				},
				projection,
				query,
			)
			.exec();
	}

	async findAll(
		query?: QueryOptions<T>,
		filter?: FilterQuery<T>,
		projection?: ProjectionType<T>,
	): Promise<FindAllResponse<T>> {
		filter = { deleted_at: null, ...filter };
		query = {
			limit: 10,
			skip: 0,
			...query,
		};

		const [count, items] = await Promise.all([
			this.model.count(filter),
			this.model.find(filter, projection, query),
		]);

		return {
			totalCount: count,
			limit: query.limit,
			offset: query.skip || 0,
			items,
		};
	}

	async update(id: string, dto: Partial<T>): Promise<T> {
		await this.model
			.updateOne({ _id: id, deleted_at: null }, dto, { new: true })
			.exec();
		return await this.model.findById(id).exec();
	}

	async softDelete(id: string): Promise<boolean> {
		const delete_item = await this.model.findById(id);
		if (!delete_item) {
			return false;
		}

		return !!(await this.model
			.findByIdAndUpdate<T>(id, { deleted_at: new Date() })
			.exec());
	}

	async permanentlyDelete(id: string): Promise<boolean> {
		const delete_item = await this.model.findById(id);
		if (!delete_item) {
			return false;
		}
		return !!(await this.model.findOneAndDelete({ _id: id }));
	}
}
