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

	async create(dto: T | any): Promise<T> {
		const created_data = await this.model.create(dto);
		return (await created_data.save()).toObject();
	}

	async insertMany(dto: T[] | any): Promise<any> {
		const result = await this.model.insertMany(dto);
		return result;
	}

	async findOneById(
		id: string,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<T> {
		const item = await this.model.findById(id, projection, options);
		return item.deleted_at ? null : item;
	}

	async findOneByCondition(
		condition: FilterQuery<T> = {},
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<T> {
		return await this.model
			.findOne(
				{
					...condition,
					deleted_at: null,
				},
				projection,
				options,
			)
			.limit(10)
			.exec();
	}

	async findAll(
		condition: FilterQuery<T>,
		projection?: ProjectionType<T>,
		options?: QueryOptions<T>,
	): Promise<FindAllResponse<T>> {
		condition = { deleted_at: null, ...condition };
		options = {
			limit: 10,
			skip: 0,
			...options,
		};
		const [count, items] = await Promise.all([
			this.model.count(condition),
			this.model.find(condition, projection, options),
		]);

		return {
			count,
			limit: options.limit,
			skip: options.skip,
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
